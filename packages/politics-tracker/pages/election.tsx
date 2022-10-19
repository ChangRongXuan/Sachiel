import type { GetServerSideProps } from 'next'
import type { ElectionLink } from '~/types/election'
import type {
  GenericGQLData,
  withKeyObject,
  RawElection,
  RawPersonElection,
} from '~/types/common'
import { print } from 'graphql'
import { fireGqlRequest, electionName } from '~/utils/utils'
import { cmsApiUrl } from '~/constants/config'
// @ts-ignore: no definition
import errors from '@twreporter/errors'
// @ts-ignore: no definition
import EVC from '@readr-media/react-election-votes-comparison'
import DefaultLayout from '~/components/layout/default'
import Nav, { type LinkMember } from '~/components/nav'
import GetElection from '~/graphql/query/election/get-election.graphql'
import GetElectionHistoryOfArea from '~/graphql/query/election/get-election-history-of-area.graphql'

const DataLoader = EVC.DataLoader
const EVCComponent = EVC.ReactComponent

type ElectionPageProps = {
  data: any // TODO: no definition for external data, need to add it in the future
  prev: null | ElectionLink
  next: null | ElectionLink
}

export const getServerSideProps: GetServerSideProps<
  ElectionPageProps
> = async ({ query }) => {
  const { year, area, type } = query
  const yearNumber = Number(year)
  const areaStr = String(area)

  const dataLoader = new DataLoader({
    apiOrigin: 'https://whoareyou-gcs.readr.tw/elections',
    year,
    type,
    area,
  })

  try {
    // const data = await dataLoader.loadData()

    const electionMap: withKeyObject<RawElection> = {}
    const elections: ElectionLink[] = []
    let election: undefined | RawElection
    {
      // get election data
      const rawData: GenericGQLData<RawElection[], 'elections'> =
        await fireGqlRequest(
          print(GetElection),
          {
            year: yearNumber,
            type,
          },
          cmsApiUrl
        )

      const gqlErrors = rawData.errors

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `GetElection` query'),
          'GraphQLError',
          'failed to complete `GetElection`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      election = rawData.data?.elections?.[0]
      if (!election) {
        return {
          notFound: true,
        }
      }
    }

    {
      // use personElection to get election list
      const rawData: GenericGQLData<RawPersonElection[], 'personElections'> =
        await fireGqlRequest(
          print(GetElectionHistoryOfArea),
          {
            type,
            area: areaStr,
          },
          cmsApiUrl
        )

      const gqlErrors = rawData.errors

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          new Error('Errors returned in `GetElectionHistoryOfArea` query'),
          'GraphQLError',
          'failed to complete `GetElectionHistoryOfArea`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      // since virtual field (`city`) could not be used in where clause of query,
      // we need to filter data ourself.
      rawData.data?.personElections
        .filter((pe: RawPersonElection) => {
          return pe.electoral_district?.city === areaStr
        })
        .map((pe: RawPersonElection) => {
          const e = pe.election as RawElection
          const eId = e.id as string
          electionMap[eId] = e
          return pe
        })

      Object.values(electionMap).map((e: RawElection) => {
        elections.push({
          electionType: String(type),
          electionArea: areaStr,
          name: electionName<string | number | undefined>(
            e.election_year_year,
            e.name,
            areaStr
          ),
          year: Number(e.election_year_year),
          month: Number(e.election_year_month),
          day: Number(e.election_year_day),
        })
      })

      elections.sort((prev, current) => {
        return prev.year - current.year
      })
    }
    const index = elections.findIndex((e) => e.year === yearNumber)

    return {
      props: {
        data: {},
        prev: elections[index - 1] ?? null,
        next: elections[index + 1] ?? null,
      },
    }
  } catch (err) {
    // All exceptions that include a stack trace will be
    // integrated with Error Reporting.
    // See https://cloud.google.com/run/docs/error-reporting
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          err,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
      })
    )

    return {
      notFound: true,
    }
  }
}

function getConfigItme(item: ElectionLink | null): LinkMember | undefined {
  return item
    ? {
        backgroundColor: 'bg-campaign',
        content: item.name,
        href: {
          pathname: '/election',
          query: {
            year: item.year,
            area: item.electionArea,
            type: item.electionType,
          },
        },
      }
    : undefined
}

const Election = (props: ElectionPageProps) => {
  const navProps = {
    prev: getConfigItme(props.prev),
    next: getConfigItme(props.next),
  }

  return (
    <DefaultLayout>
      <main className="mt-header flex w-screen flex-col items-center md:mt-header-md">
        <div className="w-full">
          {/* <EVCComponent
            year={2018}
            title="test"
            districts={props.data.TaipeiCity.districts}
          /> */}
          <Nav {...navProps} />
        </div>
      </main>
    </DefaultLayout>
  )
}

export default Election

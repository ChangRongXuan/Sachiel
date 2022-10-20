import React, { useState } from 'react'
import styled from 'styled-components'
import CouncilList from '~/components/landing/council-content'
import Image from 'next/image'

const CouncilContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  #councilorBlock {
    position: absolute;
    top: -64px;
    visibility: hidden;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    #councilorBlock {
      top: -80px;
    }
  }
`
const CouncilContentWrap = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.lightPurple};
  box-shadow: inset 0px -4px 0px #000000;
`
const TitleWrap = styled.div`
  width: 100%;
  height: 57px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.breakpoint.xl} {
    height: 64px;
  }
`
const SubTitle = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.textColor.blue};
  box-shadow: inset 0px -4px 0px #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  /* TODO: 建檔成theme variable */
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor.white};
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 28px;
  }
  ${({ theme }) => theme.breakpoint.xxl} {
    width: 344px;
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
  }
`

const SideBar = styled.div`
  padding: 16px 8px 20px;
  box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
  width: 40px;
  height: 100%;
  background: ${({ theme }) => theme.backgroundColor.landingYellow};
  ${({ theme }) => theme.breakpoint.xxl} {
    width: 6vw;
    box-shadow: inset -4px 0px 0px #000000;
  }
`

const CouncilContent = styled.div`
  width: 100%;
  display: flex;
`

const ButtonWrap = styled.div`
  width: 100%;
  padding: 20px 15px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 20px 0px;
  }
`
const ButtonGroup = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.backgroundColor.landingPurple};
  max-width: 1230px;
  margin: auto;
  padding: 20px 15px 10px 15px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 10px 20px;
  }

  #listBox {
    width: 100%;
    /* outline: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      cursor: pointer;
    }
  }

  ul {
    /* outline: 1px solid blue; */
    display: block;
    width: 260px;
    margin: auto;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    ${({ theme }) => theme.breakpoint.sm} {
      width: 430px;
    }
    ${({ theme }) => theme.breakpoint.md} {
      justify-content: center;
      width: 640px;
    }
    ${({ theme }) => theme.breakpoint.xl} {
      width: 1000px;
      max-width: 1230px;
    }
  }
  /* //a才是真的button外觀 */
  ul li div {
    text-decoration: none;
    background: ${({ theme }) => theme.backgroundColor.white};
    color: ${({ theme }) => theme.textColor.blue};
    padding: 8px 15px;
    font-weight: 500;
    font-size: 14px;
    padding: 8px 15px;
    border-radius: 32px;
    line-height: 1.3;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${({ theme }) => theme.textColor.blue};
    ${({ theme }) => theme.breakpoint.md} {
      font-size: 18px;
      padding: 8px 12px;
      min-width: 150px;
    }
  }
  li {
    margin: 6px;
    ${({ theme }) => theme.breakpoint.md} {
      margin: 10px 5px;
    }
  }

  #press {
    font-weight: 500;
    font-size: 14px;
    padding: 8px 15px;
    border-radius: 32px;
    line-height: 1.3;
    border: 1px solid ${({ theme }) => theme.textColor.blue};
    color: ${({ theme }) => theme.textColor.white};
    background: ${({ theme }) => theme.textColor.blue};
    box-shadow: 0px 2px 20px rgba(131, 121, 248, 0.1),
      0px 2px 4px rgba(131, 121, 248, 0.5);
    ${({ theme }) => theme.breakpoint.md} {
      font-size: 18px;
      padding: 8px 12px;
      min-width: 150px;
    }
  }

  span {
    font-size: 14px;
    display: none;
    ${({ theme }) => theme.breakpoint.md} {
      display: inline-block;
    }
  }
`
const ContentSide = styled.div`
  background: ${({ theme }) => theme.backgroundColor.landingYellow};
  display: none;
  ${({ theme }) => theme.breakpoint.xxl} {
    min-width: 86.5px;
    display: block;
    width: 6vw;
    box-shadow: inset -4px 0px 0px #000000, inset 0px -4px 0px #000000;
  }
`
const Content = styled.div`
  width: 100%;
  padding-bottom: 20px;
  /* outline: 5px solid red; */
  ${({ theme }) => theme.breakpoint.md} {
    padding: 20px 40px 40px;
  }
`

const ToggleGroup = styled.div`
  max-height: 100px;
  display: block;
  ${({ theme }) => theme.breakpoint.md} {
    max-height: 65px;
  }
`
const ToggleButton = styled.div`
  box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 7px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.textColor.blue};
  display: flex;
  align-items: center;
  padding-top: 10px;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 16px;
  }
`

//步驟：

/**
 *
 * @returns {React.ReactElement}
 */

// @ts-ignore
export default function CouncilMain({ propsData }) {
  //直接先生一筆lowtohigh的資料群再去map
  const newPropsData = JSON.parse(JSON.stringify(propsData))
  const rawDatas = newPropsData['councilorAndPolitics']

  // @ts-ignore
  const lowToHigh = (datas) => {
    return [...datas].sort((a, b) => {
      return a?.amount / a?.total - b?.amount / b?.total
    })
  }

  //跑縣市的資料已經經過完成比例排序
  const dataOrderByCompletePercent = lowToHigh(rawDatas)

  /**
   *
   * @param {Object[]} cityItems
   */
  const initState = (cityItems) => {
    const menuItems = []
    for (let i = 0; i < cityItems.length; i++) {
      menuItems.push({
        id: i + 1,
        infor: cityItems[i],
        active: false,
        // @ts-ignore
        name: cityItems[i].name,
        // @ts-ignore
        total: cityItems[i].total,
        // @ts-ignore
        amount: cityItems[i].amount,
      })
    }
    return menuItems
  }

  const defaultMenuItems = initState(dataOrderByCompletePercent)
  // 一開始沒有被按的項目, active全為false
  const firstRender = [...defaultMenuItems]
  firstRender[0].active = true
  const [menuItems, setMenuItems] = useState(firstRender)
  const [councilRegion, setCouncilRegion] = useState(0)

  const [toggle, setToggle] = useState(true)
  const toggleStatus = toggle
    ? { overflow: 'hidden' }
    : { overflow: 'visible', maxHeight: 'none' }
  const toggleNotion = toggle ? '展開所有縣市' : '收合部分縣市'

  return (
    <CouncilContainer>
      <span id="councilorBlock"></span>
      <CouncilContentWrap>
        <TitleWrap>
          <SideBar />
          <SubTitle>補坑進度：縣市議員政見</SubTitle>
        </TitleWrap>
        <CouncilContent>
          <ContentSide />
          <Content>
            <ButtonWrap>
              <ButtonGroup>
                <ToggleGroup style={toggleStatus}>
                  <div id="listBox">
                    <ul>
                      {menuItems.map(
                        (
                          // @ts-ignore
                          v,
                          // @ts-ignore
                          i
                        ) => {
                          return (
                            <li
                              key={i}
                              onClick={() => {
                                firstRender[0].active = false
                                const newMenuItems = firstRender.map(
                                  (v, index) => {
                                    if (i === index)
                                      return { ...v, active: true }

                                    return v
                                  }
                                )

                                setMenuItems(newMenuItems)
                                setCouncilRegion(i)
                              }}
                            >
                              {v.active ? (
                                <div id="press">
                                  {v.name}
                                  <span>
                                    ( {v.amount} / {v.total} )
                                  </span>
                                </div>
                              ) : (
                                <div id="nopress">
                                  {v.name}
                                  <span>
                                    ( {v.amount} / {v.total})
                                  </span>
                                </div>
                              )}
                            </li>
                          )
                        }
                      )}
                    </ul>
                  </div>
                </ToggleGroup>
                <ToggleButton
                  onClick={() => {
                    setToggle(!toggle)
                  }}
                >
                  {toggleNotion}
                  {toggle ? (
                    <Image
                      alt="arrowPurple"
                      src="/landingpage/arrow_down_purple.svg"
                      width="20"
                      height="20"
                      onClick={() => {}}
                    />
                  ) : (
                    <Image
                      alt="arrowPurple"
                      src="/landingpage/arrow_up_purple.svg"
                      width="20"
                      height="20"
                      onClick={() => {}}
                    />
                  )}
                </ToggleButton>
              </ButtonGroup>
            </ButtonWrap>
            <CouncilList
              // @ts-ignore
              councilRegion={councilRegion}
              dataOrderByCompletePercent={dataOrderByCompletePercent}
            />
          </Content>
        </CouncilContent>
      </CouncilContentWrap>
    </CouncilContainer>
  )
}

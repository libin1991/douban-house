import React, { Component, Fragment } from 'react';
import { List, Button, Icon } from 'antd-mobile';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Pagination from 'comp/Pagination';
import { GetHouseById } from '@/api';
import ImgProxy from 'comp/ImgProxy';
import { resolveScopedStyles } from '@/util';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const scoped = resolveScopedStyles(
  <scope>
    <style jsx>{`
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: block;
        margin-right: 15px;
        float: left;
      }
    `}</style>
  </scope>
);
class HouseDetail extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id }
      }
    } = props;
    this.id = id;
    this.state = {
      index: 0,
      house: {
        imgs: []
      }
    };
  }

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };

  componentDidMount() {
    GetHouseById(this.id).then(res => {
      if (res) {
        this.setState({
          house: res
        });
      }
    });
  }
  render() {
    let { house, index } = this.state;
    return (
      <div className="house">
        <section className="house-carousel">
          {house.imgs.length ? (
            <Fragment>
              <AutoPlaySwipeableViews
                resistance
                index={index}
                onChangeIndex={this.handleChangeIndex}
              >
                {house.imgs.map(i => (
                  <ImgProxy src={i} key={i} />
                ))}
              </AutoPlaySwipeableViews>
              <Pagination
                dots={house.imgs.length}
                index={index}
                onChangeIndex={this.handleChangeIndex}
              />
            </Fragment>
          ) : (
            <ImgProxy />
          )}
        </section>
        <section className="house-info">
          <h3 className="house-info-title">
            {house.title}
            <div className="block-line" />
          </h3>
          <List className={`house-info-person ${scoped.className}`}>
            <List.Item className={`row ${scoped.className}`} arrow="horizontal">
              <ImgProxy
                src={house.userface}
                className={`avatar ${scoped.className}`}
              />
              <div className="name-wrap">
                <span>{house.author}</span>
                <span>{house.ctime}</span>
              </div>
            </List.Item>
          </List>
          <div className="house-info-detail flexbox">
            <div className="item size flexbox">
              <h4>{house.model || '暂无'}</h4>
              <span>房型</span>
            </div>
            <div className="item area flexbox">
              <h4>{house.size || '暂无'}</h4>
              <span>总面积</span>
            </div>
            <div className="item money flexbox">
              <h4>{house.price || '暂无'}</h4>
              <span>价格</span>
            </div>
          </div>
        </section>
        <section className="house-origin">{house.content}</section>

        <div className="test-wrap">
          <div className="test" />
          <div className="div" style={{ margin: '10px 0px', height: 10 }} />
          <div className="test2" />
        </div>

        <footer className="house-ft flexbox">
          <div className="border1px" />
          <div className="ft-item left flexbox">
            <div className="ft-item-wx flexbox">
              <Icon type="ellipsis" />
              <p>微信</p>
            </div>
            <div className="ft-item-phone flexbox">
              <Icon type="ellipsis" />
              <p>电话</p>
            </div>
          </div>
          <div className="ft-item flexbox right">
            <Button type="ghost" size="small" inline={true} icon="ellipsis">
              收藏
            </Button>
          </div>
        </footer>
        <style jsx>{`
          @import '../styles/mixins.scss';
          .house {
            height: 100vh;
            background: #fff;
            &-carousel {
              position: relative;
              min-height: 450px;
            }
            &-info {
              padding: 0 20px;
              &-title {
                position: relative;
                margin: 0;
                padding: 20px 0 0 15px;
                .block-line {
                  position: absolute;
                  width: 100%;
                  height: 2px;
                  background-color: #fff;
                  margin-left: -20px;
                  bottom: -2px;
                  z-index: 2;
                }
              }
              &-detail {
                .item {
                  flex: 1;
                  max-width: 33.33%;
                  text-align: center;
                  flex-direction: column;
                  h4 {
                    /* prettier-ignore*/
                    font-size: 18PX;
                    margin: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  span {
                    color: darkgray;
                  }
                  &.money {
                    h4 {
                      color: red;
                    }
                  }
                }
              }
              .name-wrap {
                display: flex;
                flex-direction: column;
                justify-content: center;
                float: left;
                /* prettier-ignore*/
                font-size: 14PX;
              }
            }
            &-origin {
              padding: 25px;
            }
            &-ft {
              box-sizing: border-box;
              position: fixed;
              bottom: 0;
              width: 100%;
              background: #fff;
              padding: 20px;
              .border1px {
                @include border1px();
              }
              .ft-item {
                &.left {
                  flex: 2;
                }
                &.right {
                  flex: 1;
                  align-items: center;
                  justify-content: flex-end;
                }
                &-wx,
                &-phone {
                  flex-direction: column;
                  justify-content: center;
                  flex: 1;
                  p {
                    margin: 0;
                  }
                }
              }
            }
          }
        `}</style>
        {scoped.styles}
      </div>
    );
  }
}

export default HouseDetail;

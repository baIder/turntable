<template>
    <div class="root">
        <div class="menu-wrapper init" ref="menuRef">
            <div class="menu data-area" ref="dataArea">
                <span
                        v-for="item in areaArr"
                        :key="item.id"
                        @click="handleAreaClick(item.id,$event)"
                        class="text-wrapper"
                >
                    <span>
                        {{ item.name }}
                    </span>
                </span>
            </div>
            <div class="menu data-pos" ref="dataPos">
                <span
                        v-for="item in currentArea.children"
                        :key="item.id"
                        @click="handlePosClick(item.id,$event)"
                        class="text-wrapper"
                >
                    <span>
                        {{ item.name }}
                    </span>
                </span>
            </div>
            <div class="controller controller-lv1"/>
            <div class="controller controller-lv2"/>
            <div class="controller controller-lv3"/>
            <div class="btn-panel" tips="更多功能" @click="togglePanel"/>
            <div class="btn-switch" @click="toggleMenu"/>
        </div>
        <div class="panel hidden" ref="panelRef">
            <div class="title">
                更多功能
                <span @click="togglePanel">
                <SvgClose/>
                </span>
            </div>
            <div class="body">
                <div class="btn-function">
                    <div class="fullscreen"></div>
                    <span>全屏切换</span>
                </div>
                <div class="btn-function">
                    <div class="vr"></div>
                    <span>VR视觉</span>
                </div>
                <div class="btn-function">
                    <div class="gyro"></div>
                    <span>陀螺仪</span>
                </div>
                <div class="btn-function">
                    <div class="music"></div>
                    <span>背景音乐</span>
                </div>
                <div class="btn-function">
                    <div class="commentary"></div>
                    <span>场景解说</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mockData} from '@/data'
import {toggleActive} from '@/utils/toggleActive'
import SvgClose from '@/components/SvgClose.vue'

export default {
    name: 'HelloWorld',
    components: {SvgClose},
    data() {
        return {
            areaArr: [],
            currentArea: {},
            currentPos: {},
        }
    },
    methods: {
        handleAreaClick(id, ev) {
            this.currentArea = this.areaArr.find(i => i.id === id)
            this.currentPos = this.currentArea.children[0]
            toggleActive({ev})
            this.$nextTick(() => {
                this.$refs.dataPos.children[0].classList.add('active')
                this.calcPosDeg()
            })
            this.$refs.dataArea.style.rotate = '-' + ev.target.dataset.rotate + 'deg'
            this.$refs.dataPos.style.rotate = '0deg'
        },
        handlePosClick(id, ev) {
            this.currentPos = this.currentArea.children.find(i => i.id === id)
            toggleActive({ev})
            this.$refs.dataPos.style.rotate = -Number(ev.target.dataset.rotate) + 'deg'
        },
        toggleMenu() {
            this.$refs.menuRef.classList.toggle('hidden')
        },
        togglePanel() {
            this.$refs.panelRef.classList.toggle('hidden')
        },
        calcPosDeg() {
            const posArr = Array.from(this.$refs.dataPos.children)
            posArr.forEach((el, index) => {
                if (index === 0) {
                    el.children[0].dataset.rotate = '0'
                    el.dataset.rotate = '0'
                } else {
                    const deg = Number(posArr[index - 1].dataset.rotate) + (this.currentArea.children[index].name.length + this.currentArea.children[index - 1].name.length) * 1.5 + 1
                    el.children[0].dataset.rotate = deg.toString()
                    el.dataset.rotate = deg.toString()
                    el.style.rotate = deg + 'deg'
                }
            })
        },
        calcAreaDeg() {
            const areaArr = Array.from(this.$refs.dataArea.children)
            areaArr.forEach((el, index) => {
                if (index === 0) {
                    el.children[0].dataset.rotate = '0'
                    el.dataset.rotate = '0'
                } else {
                    const deg = Number(areaArr[index - 1].dataset.rotate) + (this.areaArr[index].name.length + this.areaArr[index - 1].name.length) * 1.5
                    el.children[0].dataset.rotate = deg.toString()
                    el.dataset.rotate = deg.toString()
                    el.style.rotate = deg + 'deg'
                }
            })
        },
        init() {
            this.areaArr = mockData()
            this.currentArea = this.areaArr[0]
            this.currentPos = this.currentArea.children[0]
            this.$nextTick(() => {
                this.$refs.dataArea.children[0].classList.add('active')
                this.$refs.dataPos.children[0].classList.add('active')
                this.calcAreaDeg()
                this.calcPosDeg()
                setTimeout(() => {
                    this.$refs.menuRef.classList.remove('init')
                }, 100)
            })
        },
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="scss" scoped>
.menu-wrapper {
  position: relative;
  transition: all .5s ease-in-out;
  transform: translateY(14vh);

  > .data-area {
    height: 32vh;
    z-index: 11;
  }

  > .data-pos {
    height: 37vh;
    z-index: 10;
  }

  > .menu {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: 14vh;
    border-radius: 50% 50% 0 0;
    -webkit-transform-style: preserve-3d;
    transform-origin: 50% 100%;
    transition: all .5s ease-in-out;

    > .text-wrapper {
      position: absolute;
      display: inline-block;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      text-align: center;
      color: rgba(255, 255, 255, .8);
      transform-origin: 50% 100%;
      pointer-events: none;

      > span {
        padding: 1.4vh;
        font-size: 1.6vh;
        cursor: pointer;
        border-radius: 40px;
        z-index: 200;
        pointer-events: visible;
        transform: translateY(-3px);
        display: inline-block;
        position: relative;
      }

      > span {
        transition: all 1s ease-in-out;
      }

      > &.active {
        > span {
          color: white;
          font-weight: 700;
          transform: translateY(-7px);

          &::after {
            content: "";
            position: absolute;
            width: 18px;
            height: 2px;
            background: rgba(255, 255, 255, .8);
            border-radius: 110px 0 110px 0;
            left: 50%;
            transform: translateX(-50%);
            bottom: 3px;
          }
        }
      }
    }
  }

  > .controller-lv1 {
    width: 54vh;
    height: 54vh;
  }

  > .controller-lv2 {
    width: 64vh;
    height: 64vh;
  }

  > .controller-lv3 {
    width: 74vh;
    height: 74vh;
  }

  > .controller {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    z-index: 1;
    transition: all .5s ease-in-out;
  }

  > .btn-switch {
    background: url(@/assets/switch.png) no-repeat scroll center center;
    background-size: 100%;
    position: absolute;
    transition: transform .8s ease-in-out, scale 50ms ease-in-out;
    z-index: 100;
    pointer-events: visible;
    cursor: pointer;
    width: 6.4vh;
    height: 8.4vh;
    left: calc(50% - 3.2vh);
    bottom: 16.2vh;

    &:active:hover {
      scale: 0.98;
    }
  }

  > .btn-panel {
    background: url(@/assets/panel.png) no-repeat;
    background-size: cover;
    position: absolute;
    transition: transform .5s ease-in-out, scale .1s ease-in-out, opacity .5s ease-in-out;
    z-index: 100;
    pointer-events: visible;
    cursor: pointer;
    width: 4.3vh;
    height: 4.3vh;
    left: calc(50% - 10.15vh);
    bottom: 18vh;

    &:active:hover {
      scale: 0.98;
    }

    &::after {
      content: attr(tips);
      position: absolute;
      color: #fff;
      left: 50%;
      transform: translateX(-50%);
      top: calc(100% + 2px);
      text-align: center;
      font-size: 1.4vh;
      width: max-content;
    }
  }

  &.init {
    transform: translateY(30vh);

    > .menu {
      height: .1vh;
    }

    > .btn-panel {
      opacity: 0;
    }

    > .controller-lv1 {
      backdrop-filter: saturate(150%) contrast(80%) blur(3px);
    }

    > .controller-lv2 {
      height: .1vh;
    }

    > .controller-lv3 {
      height: .1vh;
    }
  }

  &.hidden {
    transform: translateY(20vh);

    > .menu {
      height: .1vh;
    }

    > .btn-panel {
      opacity: 0;
      pointer-events: none;
    }

    > .controller-lv1 {
      backdrop-filter: saturate(150%) contrast(80%) blur(3px);
    }

    > .controller-lv2 {
      height: .1vh;
    }

    > .controller-lv3 {
      height: .1vh;
    }
  }
}

.root {
  position: fixed;
  bottom: 0;
  width: 100%;

  > .panel {
    position: fixed;
    background-color: rgba(0, 0, 0, .5);
    width: auto;
    max-width: 500px;
    min-width: 180px;
    z-index: 4009;
    border-radius: 8px;
    backdrop-filter: saturate(150%) contrast(80%) blur(3px);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -90%);
    text-align: center;
    line-height: 2em;
    transition: opacity .2s;

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }

    > .title {
      height: 48px;
      border-bottom: 1px solid rgba(255, 255, 255, .2);
      padding: 0 15px;
      font-size: 16px;
      display: flex;
      align-items: center;
      color: #fff;

      &::before {
        content: "";
        background: url(@/assets/panel.png) no-repeat scroll center center;
        background-size: 100%;
        width: 24px;
        height: 24px;
        margin-right: 6px;
      }

      > span {
        position: absolute;
        right: 10px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        &:active:hover {
          scale: 0.8;
        }

        > svg {
          fill: #ffffffcc;
          transition: scale .2s;
        }
      }
    }

    > .body {
      padding: 10px 12px;
      width: max-content;
      max-width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      > .btn-function {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        transition: scale .2s;

        &:active:hover {
          scale: 0.9;
        }

        > div {
          background-size: 100%;
          width: 48px;
          height: 48px;
        }

        > span {
          color: #ffffff;
          font-size: 12px;
        }

        & + .btn-function {
          margin-left: 12px;
        }
      }

      .fullscreen {
        background-image: url(@/assets/fullscreen.png);
      }

      .vr {
        background-image: url(@/assets/vrmode.png);
      }

      .gyro {
        background-image: url(@/assets/gyro.png);
      }

      .music {
        background-image: url(@/assets/bgmusic.png);
      }

      .commentary {
        background-image: url(@/assets/music.png);
      }
    }
  }
}
</style>

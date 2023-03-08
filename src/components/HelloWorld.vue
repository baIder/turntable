<template>
    <div class="root">
        <div class="menu-wrapper">
            <div class="menu data-area">
            <span
                    v-for="(item,index) in areaArr"
                    :key="item.id"
                    @click="handleAreaClick(item.id,$event)"
                    :style="{rotate:`${19*index}deg`}"
                    class="text-wrapper"
            >
                <span>
                {{ item.name }}
                </span>
            </span>
            </div>
            <div class="menu data-pos">
            <span
                    v-for="(item,index) in currentArea.children"
                    :key="item.id"
                    @click="handlePosClick(item.id,$event)"
                    :style="{rotate:`${19*index}deg`}"
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
        </div>
    </div>
</template>

<script>
import {mockData} from '@/data'
import {toggleActive} from '@/utils/toggleActive'

export default {
    name: 'HelloWorld',
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
        },
        handlePosClick(id, ev) {
            this.currentPos = this.currentArea.children.find(i => i.id === id)
            toggleActive({ev})
        },
    },
    mounted() {
        this.areaArr = mockData()
        this.currentArea = this.areaArr[0]
        this.currentPos = this.currentArea.children[0]
    }
}
</script>

<style lang="scss" scoped>
.menu-wrapper {
  position: relative;
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
        border: 1px solid red;
        z-index: 200;
        pointer-events: visible;
        transform: translateY(-3px);
        display: inline-block;
      }

      > &.active {
        > span {
          color: white;
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
  }
}

.root {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>

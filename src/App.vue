<template>
    <div id="app">
        <HelloWorld/>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import '@/style/reset.scss'

export default {
    name: 'App',
    components: {
        HelloWorld
    }
}
</script>

<style>
#app {
    width: 100vw;
    height: 100vh;
    background: url("@/assets/bg.jpg") no-repeat;
    background-size: cover;
    user-select: none;
    overflow: hidden;
}
</style>

<template>
    <div>
        <span>
        test
        </span>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    }
}
</script>

<style lang="scss" scoped>
div {
  > span {
    font-weight: bold;
  }
}
</style>

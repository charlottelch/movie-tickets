<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" /> -->
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      value: '',
    }
  },
  mounted () {
  },
  methods: {
    onSearch(val) {
      console.log(val);
    },
    onCancel() {
      // Toast('取消');
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
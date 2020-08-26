<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="defaultActive"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            首页
          </el-menu-item>
          <el-submenu index="1" v-for="item in get_MenuList" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              :index="value.url"
              v-for="value in item.children"
              :key="value.id"
            >{{value.title}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getMenuList } from "../util/axios";
export default {
  data() {
    return {
      // navList: [],
      
      defaultActive: "/home",
    };
  },
  mounted() {
    this.defaultActive = this.$route.path;
    this.getMenuListAction();
    // getMenuList({ istree: 1 }).then((res) => {
    //   if (res.code === 200) {
    //     this.navList = res.list;
    //   }
    // });
  },
  computed: {
    ...mapGetters(["get_MenuList"]),
  },
  methods: {
    ...mapActions(["getMenuListAction"]),
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-menu {
  min-height: 580px;
}
</style>

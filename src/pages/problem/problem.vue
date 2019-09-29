<template>
  <el-container>
    <el-aside width="300px">
      <el-menu
        class="el-menu-vertical-demo"
        default-active="1"
        active-text-color="#409Eff"
        @select="handleOpen"
      >
        <div v-for="(item,i) in listWithoutChild" :key="i">
          <el-menu-item :index="String(item.id)">
            <i class="el-icon-setting"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>

        <div v-for="(val) in listWithChild" :key="val.id">
          <el-submenu :index="String(val.id)">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span>{{val.title}}</span>
            </template>
            <el-menu-item :index="String(lists.id)" v-for="(lists,s) in val.list" :key="s">{{lists.title}}</el-menu-item>
          </el-submenu>
        </div>
        
      </el-menu>
    </el-aside>
    <el-container class="right-side" > 
        <div class="box">
      <div class="title_box">
        <h2>{{title}}</h2>
      </div>
      <div class="content" v-html="content">
      </div>
    </div>
    </el-container>
  </el-container>
</template>

<script>
import introduce from "@/components/introduce/introduce.vue";
import Standard from "@/components/Standard/Standard.vue";
import { asideNav,problem } from "api/userAjax";
export default {
  data() {
    return {
      listWithoutChild: [],
      listWithChild: [],
      content:'',
      title:'',
    };
  },
  created() {
    this.getdata();
  },
  components: {
    introduce,
    Standard
  },

  computed: {},

  mounted() {},
  methods: {
    handleOpen(key) {
        problem({id:key}).then(res=>{
        this.content = res.data.data.content
        this.title = res.data.data.title
        })
    },
    getdata() {
        problem({id:1}).then(res=>{
        this.content = res.data.data.content
        this.title = res.data.data.title
        })
      asideNav().then(res => {
        this.listWithChild = res.data.data.listWithChild;
        this.listWithoutChild = res.data.data.listWithoutChild;
      });
    }
  }
};
</script>
<style lang='scss' scoped>
section {
  display: block;
}
.el-aside {
  width: 300px;
  margin: 0;
  color: #333;
  position: fixed;
  height: calc(100% - 20px);
  background-color: #fff;
  border-right: 1px solid #e6e6e6;
  box-sizing: border-box;
  overflow: auto;
}
.el-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
}
.right-side {
  margin-left: 300px;
  background: #fff;
}
.el-menu-item.is-active {
  background-color: #ecf5ff;
}
.content{
    width: 95%;
    font-size: 16px;
    text-align: left;
    font-size: 14px;
    line-height: 1.6;
    padding: 20px;
    overflow: auto;
    width: 100%;
    background-color: #fff;
}
.title_box {
  height: auto;
  margin: 30px 30px 10px;
  width: auto;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 10px;
}
.box {
  width:700px;
  padding: 20px;
  margin: 60px auto;
}
</style>
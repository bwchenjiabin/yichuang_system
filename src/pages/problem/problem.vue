<template>
  <el-container>
    <el-aside width="300px">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="String(index)"
        active-text-color="#409Eff"
        @select="handleOpen">
        <div v-for="(item,i) in listWithoutChild" :key="i">
          <el-menu-item :index="String(item.id)">
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
        <div v-for="(val) in listWithChild" :key="val.id">
          <el-submenu :index="String(val.id)">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span>{{val.title}}</span>
            </template>
            <el-menu-item
              :index="String(lists.id)"
              v-for="(lists,s) in val.list"
              :key="s"
            >{{lists.title}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container class="right-side">
      <div class="box">
        <div class="title_box">
          <h2>
            {{title}}
            <span
              style="right:0;position: absolute;bottom: 0px;font-size:13px;color:#808080"
            >{{time}}</span>
          </h2>
        </div>
        <div class="content" v-html="content">
    <h1>{{this.$store.state.count}}</h1>
        </div>
      </div>
      <!-- <introduce></introduce> -->
    </el-container>
  </el-container>
  
</template>

<script>
import introduce from "@/components/introduce/introduce.vue";
import Standard from "@/components/Standard/Standard.vue";
import { asideNav, problem } from "api/userAjax";
export default {
  data() {
    return {
      listWithoutChild: [],
      listWithChild: [],
      content: "",
      title: "",
      time: "",
      Id: "",
      index: ""
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

    addfun(){
      this.$store.commit('add');
    },
    reductionfun(){
      this.$store.commit("reduction");
    },


    
    handleOpen(key) {
      problem({ id: key }).then(res => {
        this.content = res.data.data.content;
        this.title = res.data.data.title;
        this.time = res.data.data.createtime;
        let time = res.data.data.createtime;
        let timearr = time.replace(" ", ":").replace(/\:/g, "-").split("-");
        let timestr = timearr[0] + "年" + timearr[1] + "月" + timearr[2] + "日\t";
        this.time = timestr;
      });
    },
    getdata() {
      var routerParams = this.$route.query.id;
      this.Id = routerParams;
      this.index = this.Id;
      problem({ id: this.Id }).then(res => {
        this.content = res.data.data.content;
        this.title = res.data.data.title;
      });
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
.content {
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
  position: relative;
  height: auto;
  margin: 30px 30px 10px;
  width: auto;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 10px;
}
.box {
  width: 700px;
  padding: 20px;
  margin: 60px auto;
}
.el-menu-item.is-active i {
  width: 0px;
  height: 0;
  background: blue;
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 0;
}
</style>
<template>
  <div>
    <div class="fill" v-if="isError">
      <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <li v-for="standard in standardsArry">
              <el-form-item :label="standard.name">
              </el-form-item>
              <el-form-item>
                <el-radio-group v-model="standard.code">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </li>-->
          <!--
            <el-form-item v-for="standard in standardsArry" :label="standard.name" :value="standard.code" v-model="ruleForm.standardSelect">
              <el-radio-group>
                <el-radio label="1" value="1">是</el-radio>
                <el-radio label="0" value="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          -->
          <!--
          <div v-for="standard in standardsArry">
            <div>
              <h4>{{standard.name}}</h4>
              <ul>
                <li v-for="spec in specs">
                  <label for="check_{{$parent.$index}}{{$index}}" class="text_checkbox">
                    <input type="radio" name="check_select_{{$parent.$index}}" id="check_{{$parent.$index}}{{$index}}" :value="spec.id" v-model="checkedSpec">
                    <span>{{ spec.name }}</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
          -->
      <div class="content">
        <div class="content-item" v-for="item in standardsArry">
          <p class="qs-title">
            {{item.id}}&nbsp;{{item.standard}}
          </p>
          <p v-for="option in options" class="option">
            <label>
              <input type="radio" :name="`${item.id}-${item.standard}`"
              v-model="requiredItem[item.id]" :value="option.value">{{option.name}}
            </label>
          </p>
        </div>
      </div>
      <transition name="fade">
        <div class="dialog" v-if="showDialog">
          <div class="submit-dialog" v-if="submitError">
            <header>
              <span>提示</span>
              <span class="close-btn" @click="showDialog = false">X</span>
            </header>
            <p>{{info}}</p>
            <div class="btn-box">
              <button class="yes" @click="showDialog = false">确定</button>
              <button @click="showDialog = false">取消</button>
            </div>
          </div>
          <div class="submit-dialog" v-else>
            <header>
              <span>提示</span>
              <span class="close-btn" @click="showDialog = false">X</span>
            </header>
            <p>{{info}}</p>
          </div>
        </div>
      </transition>
      <footer>
        <button @click="submitForm" class="submit">提交</button>
        <button @click="quiteForm" class="submit">取消</button>
      </footer>
  </div>
</div>
</template>

<script>
import vheader from '../header/header';
import { mapGetters } from 'vuex';
import api from '../../fetch/api';

export default{
  data () {
    return {
      checkedSpec: {},
      options: [{name:'是',value:'1'},
                {name:'否',value:'2'}],
      task_Id: this.$route.params.taskId,
      standardsArry: [],
      requiredItem: {},
      isError: false,
      showDialog: false,
      info: '',
      submitError: false
    };
  },
  created () {
    /*this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '检查任务完成填写'
    });*/
    document.title = '检查任务完成填写';
    //this.loadwxConfig();
    this.getStandarsArry(this.task_Id);
  },
  methods: {
    /*loadwxConfig() {
      let vm = this;
      let pageUrl = encodeURIComponent(document.URL.split('#')[0]);
      alert('pageUrl:'+pageUrl);
      let loadWXCofigurl= vm.apiUrl + 'wx/jssdk_sign/2'+'?token=' + vm.token+'&page='+pageUrl;
      vm.$store.dispatch('FETCH_WX_CONFIG',loadWXCofigurl)
        .then(()=>{
          let wxConfig = vm.$store.getters.activeWXConfig;
          wx.config({
            debug: true,
            appId: wxConfig.appId,
            timestamp: parseInt(wxConfig.timestamp),
            nonceStr: wxConfig.nonceStr,
            signature: wxConfig.signature,
            jsApiList: [
              'getLocation',
              'scanQRCode'
            ]
          });

          wx.ready(function () {
            wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          }
      });
          });
        })
    },*/
    getRequiredItem(arry) {
      // alert('getRequiredItem');
      // alert('this.standardsArry'+this.standardsArry);
      arry.forEach( item => {
        this.requiredItem[item.id] = '';
      } )
      this.$store.dispatch('setLoadingState', false);
    },
    getStandarsArry(task_Id) {
      // alert('getData');
      let standarsUrl = this.apiUrl + 'tasks/standards/' + task_Id + '/?token=' + this.token;
      // alert('taskChckComplete/standarsUrl : ' + standarsUrl);

      this.$store.dispatch('setLoadingState', true);

      this.$http.get(standarsUrl).then((response) => {
        if (response.data.respCode === "0000") {
          this.standardsArry = response.data.data;
          this.isError = true;
          this.getRequiredItem(this.standardsArry);
        }
        else {
          alert('getStandarsArry返回错误:' + response.data.respMsg);
        }
      },(response) => {
        this.$store.dispatch('setLoadingState', false);
        alert('处理失败');
      });
    },
    submitForm(formName) {
      let resule = this.validate();
      if (resule) {
        var formData = new FormData();
        formData.append("task_id", this.task_Id);
        formData.append("type", '');
        formData.append("describe", '');
        formData.append("file1", '');
        formData.append("is_trouble", '0');
        formData.append("data", JSON.stringify(this.requiredItem));

        // var formData = JSON.stringify(this.requiredItem); // 这里才是你的表单数据

        /*{
            device_id: this.device_id,
            task_id: this.task_Id,
            type: '',
            describe: '',
            file1: '',
            is_trouble: '0',
            data: formData
          }*/

        let faultUrl = this.apiUrl + 'tasks/completeJC?token=' + this.token;

        this.$store.dispatch('setLoadingState', true);

        this.$http.post(faultUrl, formData).then((response) => {
          if (response.data.respCode === "0000") {
            this.$store.dispatch('setLoadingState', false);
            this.showDialog = true;
            this.submitError = false;
            this.info = '提交成功！';
            setTimeout(() => {
              this.showDialog = false;
            }, 1000);
            setTimeout(() => {
              this.$router.push({path: '/taskChk'});
            }, 2000);
          }
          else {
            this.$store.dispatch('setLoadingState', false);
            this.showDialog = true;
            this.submitError = false;
            this.info = response.data.respMsg;
          }
        }, (response) => {
          this.$store.dispatch('setLoadingState', false);
          alert('处理失败');
        });
      } else {
          this.showDialog = true;
          this.submitError = true;
          this.info = '提交失败！ 存在必选项未选';
      }
    },
    validate() {
      // alert('validate');
      for (let i in this.requiredItem) {
        // alert('this.requiredItem[i]:'+this.requiredItem[i]);
        if (this.requiredItem[i].length === 0)
          return false;
        }
      return true;
    },
    quiteForm() {
      //this.$router.push({path: '/menuList'});
      history.go(-1);
    }
  },
  computed: {
    ...mapGetters([
      'apiUrl',
      'wxCode',
      'token'
    ])
  },
  components: {
    vheader
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.fill
  width: 80%
  margin: 20px auto
  padding: 5%
  color: #666
  background-color: #fff
  border-radius: .4rem
  box-shadow: 0 0 1rem #aaa
  .content
    border-top: .2rem solid #ccc
    border-bottom: .2rem solid #ccc
    .content-item
      padding: 2% 2%
      &:hover
        background-color: #fcf0e5
      >p
        margin-top: 2%
        margin-bottom: 2%
      .qs-title
        font-size: 14px
        font-weight: 700
        color: #333
      .option
        display:inline-block
        font-size: 14px
        margin-left: 2.5rem
  footer
    margin-top: 5%
    text-align: center
    .submit
      width: 5rem;
      height: 2rem;
      padding-top: .3rem
      padding-bottom: .3rem
      line-height: 100%;
      color: #fff;
      border: .1rem solid #20A0FF
      border-radius: .2rem
      background-color: #20A0FF
      cursor: pointer
      &:hover
        box-shadow: 0 0 5px #20A0FF
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-active
    opacity: 0
  .dialog
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background: rgba(85, 85, 85, .7)
    .submit-dialog
      position: absolute
      left: 50%
      top: 50%
      width: 80%
      height: 30%
      transform: translateX(-50%) translateY(-50%)
      border-radius: 10px
      box-shadow: 0 0 5px #555
      background-color: #fff
      header
        height: 30%
        padding-left: 10%
        line-height: 5rem
        border-radius: .5rem
        background-color: #f7f7f7
        span
          font-weight: 700
        .close-btn
          position: absolute
          right: 10%
          color: #bbb
          cursor: pointer
          &:hover
            color: #ee7419
      p
        width:100%
        height:30%
        line-height:40px
        margin:10px auto 0 auto
        text-align:center
    .btn-box
      position: absolute
      bottom: 0
      width: 100%
      height: 6rem
      line-height: 6rem
      text-align: center
      button
        width: 7rem;
        height: 2.5rem;
        padding-top:  .3rem
        padding-bottom: .3rem
        line-height: 100%;
        color: #777;
        border: 1px solid #555;
        border-radius: .2rem;
        background-color: #fff;
        cursor: pointer;
        &:hover
          box-shadow: 0 0 5px #bbb
      .yes
        margin-right: 1rem
        color: #fff
        background-color: #ee7419
        border: 1px solid #ee7419
        &:hover
          box-shadow: 0 0 5px #ee7419
</style>

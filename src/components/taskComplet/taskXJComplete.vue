<template>
  <div>
    <div class="wapper">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="设备编号" prop="devId">
          <el-input v-model="ruleForm.devId" :disabled="true"></el-input>
          <div class="c-saoyisao" @click="Saoyisao">
            <span class="icon iconfont icon-saoyisao">
            </span>
          </div>
        </el-form-item>
        <el-form-item label="设备状态" prop="is_trouble">
          <el-radio-group v-model="ruleForm.is_trouble">
            <el-radio name="devState" v-for="is_trouble in is_troubleOptions" :label="is_trouble.value" v-on:change="showControl">{{is_trouble.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="ruleForm.is_trouble == '1' ? false : true" label="异常备注" prop="describe">
           <el-input type="textarea" class="unableTxt" v-model="ruleForm.describe"></el-input>
        </el-form-item>
        <el-form-item v-show="ruleForm.is_trouble == '1' ? false : true" label="上传照片" prop="imgArr">
          <div class="c-Publish">
            <div class="Pu-img">
              <span v-for="value in imgArr">
                <a href="javascript:;">
                  <img :src="value.src" alt="img">
                </a>
              </span>
              <a href="javascript:;" class="Pu-Add-img">
                <div class="addImg">+</div>
                <input type="file" v-on:change="addImg">
              </a>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <transition name="fade">
        <div class="dialog" v-if="showDialog">
          <div class="submit-dialog" v-if="submitError">
            <header>
              <span>提示</span>
              <span class="close-btn" @click="sureButton">X</span>
            </header>
            <p>{{info}}</p>
            <div class="btn-box">
              <button class="yes" @click="sureButton">确定</button>
              <button @click="sureButton">取消</button>
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
  </div>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
import vheader from '../header/header';
import api from '../../fetch/api';
import * as _ from '../../util/tool';
import { mapActions } from 'vuex';
import bus from '../../common/js/bus.js';
import { mapGetters } from 'vuex';

export default{
  data () {
    return {
      task_Id: this.$route.params.taskId,
      device_id: this.$route.params.devId,
      dialogImageUrl: '',
      dialogVisible: false,
      showDialog: false,
      submitError: false,
      imgArr: [],
      files: [],
      saoResult: '',
      is_troubleOptions: [{
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '异常'
        }],
      ruleForm: {
        task_Id: this.$route.params.taskId,
        devId: '',
        is_trouble: '1',
        describe: '',
        upPhotoArry: []
      },
      rules: {
        is_trouble: [
          { required: true, message: '请选择设备状态', trigger: 'change' }
        ],
        devId: [
          { required: true, message: '请扫描设备', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请填写异常备注', trigger: 'blur' }
        ],
        upPhotoArry: [
          { type: 'array', required: true, message: '请至少上传一张照片', trigger: 'change' }
        ]
      }
    };
  },
  created () {
    /*this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '巡检任务完成填写'
    });*/
    document.title = '巡检任务完成填写';
    this.loadwxConfig();
    /*bus.$on('taskId-select', function(taskId) {
      alert('taskId: '+taskId);
      this.task_Id = taskId;
    });*/
  },
  methods: {
    loadwxConfig() {
      let vm = this;
      //alert('location.href:'+location.href.split('#')[0]);
      let pageUrl = encodeURIComponent(document.URL.split('#')[0]);
      let loadWXCofigurl= vm.apiUrl + 'wx/jssdk_sign/2'+'?token=' + vm.token+'&page='+pageUrl;
      vm.$store.dispatch('FETCH_WX_CONFIG',loadWXCofigurl)
        .then(()=>{
          let wxConfig = vm.$store.getters.activeWXConfig;
          wx.config({
            debug: false,
            appId: wxConfig.appId,
            timestamp: parseInt(wxConfig.timestamp),
            nonceStr: wxConfig.nonceStr,
            signature: wxConfig.signature,
            jsApiList: [
              'scanQRCode'
            ]
          });

          wx.error(function(res) {
            alert("出错了：" + res.errMsg);
          });
          /*wx.ready(function () {
            wx.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
              success: function (res) {
                //alert(typeof(res.resultStr));
                var result = JSON.parse(res.resultStr); // 当needResult 为 1 时，扫码返回的结果
                alert('result.C:'+result.C);
                if(result.C != this.device_id){
                  //alert('执行任务非扫码设备，请确认');
                  this.showDialog = true;
                  this.submitError = true;
                  this.info = '执行任务非扫码设备，请确认';
                } else {
                  //alert('res.resultStr != this.device_id')
                  this.ruleForm.devId = result.C;
                  alert('this.ruleForm.devId:'+this.ruleForm.devId);
                }
              }
            });
          });*/
        });
    },
    Saoyisao() {
      /*let wxConfig = this.$store.getters.activeWXConfig;
      this.configWxjssdk(wxConfig);
      wx.ready(function () {
        alert(6);*/
      var vm = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var result = JSON.parse(res.resultStr); // 当needResult 为 1 时，扫码返回的结果
          if(result.C == vm.device_id) {
            vm.ruleForm.devId = result.C;
          } else {
            vm.showDialog = true;
            vm.submitError = true;
            vm.info = '执行任务非扫码设备，请确认';
          }
        }
      });
      //});
    },
    showControl() {
      alert(this.ruleForm.is_trouble);
      if(this.ruleForm.is_trouble == '0') {
        this.showFlg = true;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      alert('dialogImageUrl:' + this.dialogImageUrl);
      this.dialogVisible = true;
      alert('dialogVisible:' + this.dialogVisible);
    },
    addImg: function (event) {
        let self = this;
        if (self.imgArr.length < 3) {
          var file = event.target.files[0];
          self.files.push(file);
          if (!/image\/\w+/.test(file.type)) {
            console.log('文件必须为图片！');
            return false;
          }
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            self.imgArr.push({src: this.result});
          }
        } else {
          alert('一次最多只能上传3张图片！');
        }
    },
    submitForm(formName) {
      let vm = this;
      if(vm.ruleForm.is_trouble == "2") {
        vm.$refs[formName].validate((valid) => {
        if (valid) {
          /*let badTypes = [];
          var badType = document.getElementsByName("badType");
          for (var i = 1; i < badType.length; i++) {
            if (badType[i].checked)
              badTypes.push(badType[i].value);
          }
          console.log(badTypes);*/

         //方式一
        /*  var formData = new FormData();
          formData.append("device_id", this.device_id);
          formData.append("task_id", this.task_Id);
          formData.append("type", '');
          formData.append("data", '');
          formData.append("is_trouble", this.ruleForm.is_trouble);
          if(this.ruleForm.is_trouble == 1){
            formData.append("describe", '');
            formData.append("file", '');
          }
          else{
            formData.append("describe", this.ruleForm.describe);
            let i=0,len = this.imgArr.length;
            for(i;i<len;i++) {
              this.ruleForm.upPhotoArry.push(encodeURIComponent(this.imgArr[i].src.substring(23)));
            }
            //后台需要的数据是file1，file2的格式，所以这里做了遍历
            for(var i=1;i<=this.ruleForm.upPhotoArry.length;i++){
              formData.append("file"+i, this.ruleForm.upPhotoArry[i-1]);
            }
          }*/

          //方式二
          var formData = new FormData();
          formData.append("device_id", vm.device_id);
          formData.append("task_id", vm.task_Id);
          //formData.append("saoResult", this.saoResult);
          formData.append("type", '');
          formData.append("data", '{"'+vm.device_id+'":"'+vm.ruleForm.is_trouble+'"}');
          formData.append("is_trouble", vm.ruleForm.is_trouble);
          if(vm.ruleForm.is_trouble == 1){
            formData.append("describe", '');
            formData.append("file", '');
          }
          else{
            formData.append("describe", vm.ruleForm.describe);
            for(let i=1; i <= vm.files.length; i++) {
              formData.append("file"+i, vm.files[i-1]);
            }
          }

          let faultUrl = vm.apiUrl +'tasks/completeXJ?token=' + vm.token;
          vm.$store.dispatch('setLoadingState', true);
          vm.$http.post(faultUrl, formData).then((response) => {
          if (response.data.respCode === "0000") {
            vm.showDialog = true;
            vm.submitError = false;
            vm.info = '提交成功！';
            vm.$store.dispatch('setLoadingState', false);
            setTimeout(() => {
              vm.showDialog = false;
            }, 1000);
            setTimeout(() => {
              vm.$router.push({ name: 'taskXJ', params: { enterMenuFlg: '1'}});
            }, 2000);

            }
            else{
              alert(response.data.respMsg);
            }
          })
          .catch(error => {
            vm.$store.dispatch('setLoadingState', false);
            alert('处理失败');
          });
         }
       });
      } else {
        var formData = new FormData();
          formData.append("device_id", vm.device_id);
          formData.append("task_id", vm.task_Id);
          //formData.append("saoResult", this.saoResult);
          formData.append("type", '');
          formData.append("data", '{"'+vm.device_id+'":"'+vm.ruleForm.is_trouble+'"}');
          formData.append("is_trouble", vm.ruleForm.is_trouble);
          if(vm.ruleForm.is_trouble == 1){
            formData.append("describe", '');
            formData.append("file", '');
          }
          else{
            formData.append("describe", vm.ruleForm.describe);
            for(let i=1; i <= vm.files.length; i++) {
              formData.append("file"+i, vm.files[i-1]);
            }
          }

          let faultUrl = vm.apiUrl +'tasks/completeXJ?token=' + vm.token;
          vm.$store.dispatch('setLoadingState', true);
          vm.$http.post(faultUrl, formData).then((response) => {
          if (response.data.respCode === "0000") {
            vm.showDialog = true;
            vm.submitError = false;
            vm.info = '提交成功！';
            vm.$store.dispatch('setLoadingState', false);
            setTimeout(() => {
              vm.showDialog = false;
            }, 1000);
            setTimeout(() => {
              vm.$router.push({ name: 'taskXJ', params: { enterMenuFlg: '1'}});
            }, 2000);

            }
            else{
              alert(response.data.respMsg);
            }
          })
          .catch(error => {
            vm.$store.dispatch('setLoadingState', false);
            alert('处理失败');
          });
      }

    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    sureButton() {
      setTimeout(() => {
        this.showDialog = false
      }, 500)
      /*setTimeout(() => {
        history.go(-1)
      }, 1500)*/
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
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../static/lib/icon-font/iconfont.css';
.wapper
  width:96%
  height:100%
  margin:25px 2%
  position:relative
  .el-input
    width:65%
    .el-input__inner
      display: inline-block
  .c-saoyisao
    display: inline-block
    width:13%
    color:white
    background:#052626
    border: 1px solid #052626
    border-radius:10px
    .icon-saoyisao
      display: inline-block
      width: 10%
      padding-left: 25%
      font-size:20px
  .unableTxt
    width:87%
  .upPhoto
    .el-upload--picture-card
      width:100px
      height:100px
      line-height:100px
  .c-Publish
    padding-top: .5rem
    border-bottom: 1px solid #f1f1f1
    .Pu-img
      margin: 1rem 0px
      overflow: hidden
      padding: 0px 0.5rem
      span a img
        width: 100%
      .Pu-Add-img input
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        opacity: 0
      a
        position: relative
        display: inline-block
        width: 4rem
        height: 4rem
        overflow: hidden
        float: left
        margin: 0 1.9% .4rem 1.9%
        .addImg
          width: 3.888rem
          height: 3.9rem
          text-align: center
          line-height: 3.3rem
          font-size: 3.5rem
          color: #f9696c
          border: 1px solid #c7c7c7
          > img
            height: 4rem
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

<template>
  <div>
    <h1>故障上传测试页</h1>
    <div class="wapper">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="设备状态" prop="is_trouble">
          <el-radio-group v-model="ruleForm.is_trouble">
            <el-radio name="devState" v-for="is_trouble in is_troubleOptions" :label="is_trouble.value">{{is_trouble.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="异常备注" prop="describe">
           <el-input type="textarea" class="unableTxt" v-model="ruleForm.describe"></el-input>
        </el-form-item>
        <el-form-item label="上传照片" prop="imgArr">
          <div class="c-Publish">
            <div class="Pu-img">
              <span v-for="value in imgArr">
                <a href="javascript:;">
                  <img :src="value.src" alt="img">
                </a>
              </span>
              <a href="javascript:;" class="Pu-Add-img">
                <div class="addImg">+</div>
                <input type="file" v-on:change="addImg" model="ruleForm.upPhotoArry">
                </input>
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
  </div>
</template>

<script>
import vheader from './header/header';
import api from '../fetch/api';
import * as _ from '../util/tool';
import { mapActions } from 'vuex';
import bus from '../common/js/bus.js';
import { mapGetters } from 'vuex';

export default{
  data () {
    return {
      task_Id: this.$route.params.taskId,
      device_id: this.$route.params.devId,
      dialogImageUrl: '',
      dialogVisible: false,
      imgArr: [],
      files: [],
      is_troubleOptions: [{
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '异常'
        }],
      ruleForm: {
        task_Id: this.$route.params.taskId,
        is_trouble: '1',
        describe: '',
        upPhotoArry: []
      },
      rules: {
        is_trouble: [
          { required: true, message: '请选择设备状态', trigger: 'change' }
        ]/*,
        describe: [
          { required: true, message: '请填写异常备注', trigger: 'blur' }
        ],
        upPhotoArry: [
          { type: 'array', required: true, message: '请至少上传一张照片', trigger: 'change' }
        ]*/
      }
    };
  },
  created () {
    this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '巡检任务完成填写'
    });
    /*bus.$on('taskId-select', function(taskId) {
      alert('taskId: '+taskId);
      this.task_Id = taskId;
    });*/
  },
  methods: {
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert(this.ruleForm);
          var formData = new FormData();
          formData.append("device_id", this.device_id);
          formData.append("task_id", this.task_Id);
          formData.append("type", '');
          formData.append("data", '');
          formData.append("describe", this.ruleForm.describe);
          formData.append("is_trouble", this.ruleForm.is_trouble);
          for(let i=1; i <= this.files.length; i++) {
            formData.append("file"+i, this.files[i-1]);
          }

          //发送后台
          let faultUrl = 'http://115.171.69.74:9077/';
          this.$http.post(faultUrl, formData).then((response) => {
            alert('1'+response.respCode);
          if (response.data.respCode === "0000") {
              alert(3);
              this.$router.push({path: '/menuList'});
              this.$store.dispatch('setLoadingState', false);
            }
            else{
              alert('2'+response.data.respMsg);
            }
          })
          .catch(error => {
            this.$store.dispatch('setLoadingState', false);
            console.log(error);
          });
        }
      });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
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
.wapper
  width:96%
  height:100%
  margin:25px 2%
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
</style>


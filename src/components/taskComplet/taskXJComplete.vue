<template>
  <div>
    <vheader></vheader>
    <div class="wapper">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="设备状态" prop="devState">
          <el-radio-group v-model="ruleForm.devState">
            <el-radio name="devState" v-for="devState in devStateOptions" :label="devState.value" v-on:change="showControl">{{devState.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="showFlg" label="异常备注" prop="comment">
           <el-input type="textarea" class="unableTxt" v-model="ruleForm.comment"></el-input>
        </el-form-item>
        <el-form-item label="上传照片" prop="imgArr">
          <div class="c-Publish">
            <div class="Pu-img">
              <span v-for="value in ruleForm.imgArr">
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
        <!--<el-form-item v-show="showFlg" label="上传照片" prop="upPhotoUrl">
          <el-upload class="upPhoto" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import vheader from '../header/header';
import api from '../../fetch/api';
import * as _ from '../../util/tool';
import { mapActions } from 'vuex';
import bus from '../../common/js/bus.js';

export default{
  data () {
    return {
      task_Id: this.$route.params.taskId,
      showFlg: true,
      dialogImageUrl: '',
      dialogVisible: false,
      devStateOptions: [{
          value: '1',
          label: '正常'
        }, {
          value: '0',
          label: '异常'
        }],
      ruleForm: {
        task_Id: this.$route.params.taskId,
        devState: '',
        comment: '',
        imgArr: []
      },
      rules: {
        devState: [
          { required: true, message: '请选择设备状态', trigger: 'change' }
        ],
        comment: [
          { required: true, message: '请填写异常备注', trigger: 'blur' }
        ],
        upPhotoUrl: [
          { type: 'array', required: false, message: '请至少上传一张照片', trigger: 'change' }
        ]
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
    showControl() {
      alert(1);
      alert(this.ruleForm.devState);
      if(this.ruleForm.devState == '0') {
        this.showFlg = true;
      }
    },
    addImg: function (event) {
        let self = this;
        if (self.ruleForm.imgArr.length < 6) {
          var file = event.target.files[0];
          if (!/image\/\w+/.test(file.type)) {
            console.log('文件必须为图片！');
            return false;
          }
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            self.ruleForm.imgArr.push({src: this.result});
          }
        } else {
          console.log('一次最多只能上传9张图片！');
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /*let badTypes = [];
          var badType = document.getElementsByName("badType");
          for (var i = 1; i < badType.length; i++) {
            if (badType[i].checked)
              badTypes.push(badType[i].value);
          }
          console.log(badTypes);*/
          alert(JSON.stringify(this.ruleForm));
          console.log(JSON.stringify(this.ruleForm));
          var formData = JSON.parse(JSON.stringify(this.ruleForm)); // 这里才是你的表单数据
          alert(formData);
          let data = formData;
          api.Complete(data)
            .then(res => {
              if(res.success) {
                alert(3);
                this.$router.replace('/menuList')
              }
            })
            .catch(error => {
              alert(error);
              console.log(error)
            })
        } else {
          alert('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
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

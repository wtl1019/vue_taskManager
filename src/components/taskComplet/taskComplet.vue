<template>
  <div>
    <vheader></vheader>
    <div class="wapper">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="服务方式" prop="serviceWay">
          <el-radio-group v-model="ruleForm.serviceWay">
            <el-radio label="实地查看"></el-radio>
            <el-radio label="调阅录像"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="终端类型" prop="devType">
          <el-select v-model="ruleForm.devType" placeholder="请选择终端类型">
            <el-option v-for="item in devTypeOptions" :label="item.label"  :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="故障类型" prop="badType">
          <el-checkbox-group class="badType" v-model="ruleForm.badType">
            <el-checkbox v-for="item in options" :label="item.label"  :value="item.value" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="完成日期" required>
          <el-col :span="21">
            <el-form-item prop="date">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="异常备注" prop="comment">
           <el-input type="textarea" class="unableTxt" v-model="ruleForm.comment"></el-input>
        </el-form-item>
        <el-form-item label="上传照片" prop="upPhotoUrl">
          <el-upload class="upPhoto" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
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
import vheader from '../header/header';
import api from '../../fetch/api';
import * as _ from '../../util/tool';
import { mapActions } from 'vuex';
import bus from '../../common/js/bus.js';

export default{
  data () {
    return {
      task_Id: this.$route.params.taskId,
      dialogImageUrl: '',
      dialogVisible: false,
      options: [{
          value: '01',
          label: '系统故障'
        }, {
          value: '02',
          label: '机器故障'
        }, {
          value: '03',
          label: '线路故障'
        }, {
          value: '04',
          label: '安装调试'
        }, {
          value: '05',
          label: '更换机器'
        }, {
          value: '06',
          label: 'ewrrewr'
        }],
      devTypeOptions:  [{
          value: 'photo',
          label: '摄像机'
        }, {
          value: 'menwei',
          label: '门卫室'
        }],
      ruleForm: {
        serviceWay: '',
        devType: '',
        badType: [],
        date: '',
        comment: '',
        upPhotoUrl: []
      },
      rules: {
        devType: [
          { required: true, message: '请选择终端类型', trigger: 'change' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        badType: [
          { type: 'array', required: true, message: '请至少选择一个故障类型', trigger: 'change' }
        ],
        serviceWay: [
          { required: true, message: '请选择终端类型', trigger: 'change' }
        ],
        comment: [
          { required: true, message: '请填写异常备注', trigger: 'blur' }
        ],
        upPhotoUrl: [
          { type: 'array', required: true, message: '请至少上传一张照片', trigger: 'change' }
        ]
      }
    };
  },
  created () {
    this.$store.dispatch('changeIndexConf',{
      isBack: true,
      title: '任务完成填写'
    });
    /*bus.$on('taskId-select', function(taskId) {
      alert('taskId: '+taskId);
      this.task_Id = taskId;
    });*/
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    submit() {
      let data = {
                task_Id: this.task_Id,
                serviceWay: this.ruleForm.serviceWay,
                devType: this.ruleForm.devType,
                badType: this.ruleForm.badType,
                date: this.ruleForm.date,
                comment: this.ruleForm.comment,
                upPhotoUrl: this.ruleForm.upPhotoUrl
      }
      api.Complete(data)
        .then(res => {
          if(res.success) {
            this.$router.replace('/menuList')
          }
        })
        .catch(error => {
          console.log(error)
        })
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
  .badType
    .el-checkbox
      margin-left:5px
</style>

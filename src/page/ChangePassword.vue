
<template>
    <div class="fillcontain">
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <header class="admin_title">修改密码</header>
        <el-form class="form_contianer" :model="ChangeForm" ref="ChangeForm">
        <el-form-item prop="user_real_name">
        <el-input v-model="ChangeForm.user_old_password" placeholder="旧密码"><span>dsfsf</span></el-input>
        </el-form-item>
        <el-form-item prop="user_email">
        <el-input  placeholder="新密码" v-model="ChangeForm.user_new_password"></el-input>
        </el-form-item>
        <el-form-item prop="user_type">
        <el-input  placeholder="再次输入新密码" v-model="ChangeForm.user_new_password_2"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="submitForm('ChangeForm')" class="submit_btn">修改</el-button>
        </el-form-item>
        </el-form>

    </div>

</template>

<script>
    import headTop from '../components/headTop'
    import {mapState} from 'vuex'
    import {getUserInfo} from '@/api/getData'
    import {setCookie,getCookie} from "../config/store_cookie";
    export default {
        data(){
            return {
                tableData:{},
                ChangeForm: {
                    user_old_password:"",
                    user_new_password:"",
                    user_new_password_2:""

                },
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        },
        created(){
            console.log(getCookie("token"))
            this.initData();
        },
        components: {
            headTop,
        },
        computed: {
            ...mapState(['adminInfo']),
        },
        methods: {
            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if(this.ChangeForm.user_new_password != this.ChangeForm.user_new_password_2 )
                    {
                        this.$message({
                            type: 'error',
                            message: "两次输入的密码不同"
                        });
                    }

                    else
                    {
                        if (valid) {
                            const res = await changePassword({token:getCookie("token"),user_old_password :this.ChangeForm.user_old_password,user_new_password :this.ChangeForm.user_new_password })

                            if (res.status == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });

                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.success
                                });
                            }
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '请输入正确的用户名密码',
                                offset: 100
                            });
                            return false;
                        }
                    }

                });
            },
        },
    }
</script>

    <style lang="less">
    @import '../style/mixin';
    .explain_text{
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color: #333;
    }
    .form_contianer{
    .wh(320px, auto);
    .ctp(100px,400px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn{
    width: 100%;
    font-size: 16px;
    }
    }
    .admin_set{
    width: 60%;
    background-color: #F9FAFC;
    min-height: 400px;
    margin: 20px auto 0;
    border-radius: 10px;
    ul > li{
    padding: 20px;
    span{
    color: #666;
    }
    }
    }
    .admin_title{
    margin-top: 20px;
    .sc(24px, #666);
    text-align: center;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    margin-top: 10px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
    }
    .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    }
    .avatar {
    width: 120px;
    height: 120px;
    display: block;
    }
    .text {
    font-size: 14px;
    }

    .item {
    margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
    display: table;
    content: "";
    }
    .clearfix:after {
    clear: both
    }

    .box-card {
    width: 480px;
    }
    </style>

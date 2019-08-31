<template>
    <div class="fillcontain">
        <head-top></head-top>
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <header class="admin_title">修改个人信息</header>
        <el-form class="form_contianer" :model="ChangeForm" ref="ChangeForm">
            <el-form-item prop="user_real_name">
                <el-input v-model="ChangeForm.user_real_name" placeholder="真实姓名"><span>dsfsf</span></el-input>
            </el-form-item>
            <el-form-item prop="user_email">
                <el-input  placeholder="邮箱" v-model="ChangeForm.user_email"></el-input>
            </el-form-item>
            <el-form-item prop="user_type">
                <el-input  placeholder="用户类型" v-model="ChangeForm.user_type"></el-input>
            </el-form-item>
            <el-form-item prop="user_gender">
                <el-input  placeholder="性别" v-model="ChangeForm.user_gender"></el-input>
            </el-form-item>
            <el-form-item prop="user_id_number">
                <el-input  placeholder="身份证号" v-model="ChangeForm.user_id_number"></el-input>
            </el-form-item>
            <el-form-item prop="user_address">
                <el-input  placeholder="地址" v-model="ChangeForm.user_address"></el-input>
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
    import {getUserInfo,changeUserInfo} from '@/api/getData'
    import {setCookie,getCookie} from "../config/store_cookie";
    export default {
        data(){
            return {
                tableData:{},
                ChangeForm: {
                    user_phone_number: '',
                    user_real_name:'',
                    user_email:'',
                    user_id_number:'',
                    user_type:'',
                    user_gender:'',
                    user_address:''

                },
                showLogin: true,
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
        },
        methods: {
            async initData()
            {
                console.log(getCookie("token"))

                const UserInfoData = await getUserInfo({token:getCookie("token")})
                if (UserInfoData.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '成功'
                    });
                    this.ChangeForm = UserInfoData.data;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.success
                    });
                }
            },
            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {

                        const res = await changeUserInfo({token:getCookie("token"),user_phone_number: this.ChangeForm.user_phone_number,
                            user_real_name:this.ChangeForm.user_real_name,user_email:this.ChangeForm.user_email,user_id_number:this.ChangeForm.user_id_number
                            ,user_type:this.ChangeForm.user_type,user_gender:this.ChangeForm.user_gender ,user_address:this.ChangeForm.user_address })

                        if (res.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });

                           this.initData();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.message
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

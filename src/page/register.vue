<template>
    <div class="login_page fillcontain">
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin" style="background-color: #243654">
                <div class="manage_tip">
                    <p>注册界面</p>
                </div>

                <el-form :model="registerForm" :rules="rules" ref="registerForm" style="background-color: #243654">
                    <el-form-item prop="user_phone_number">
                        <el-input v-model="registerForm.user_phone_number" placeholder="用户名"><span>dsfsf</span></el-input>
                    </el-form-item>
                    <el-form-item prop="user_password">
                        <el-input type="password" placeholder="密码" v-model="registerForm.user_password"></el-input>
                    </el-form-item>

                    <el-form-item prop="user_password_2">
                        <el-input type="password" placeholder="确认密码" v-model="registerForm.user_password_2"></el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="user_real_name">
                                <el-input v-model="registerForm.user_real_name" placeholder="真实姓名"><span>dsfsf</span></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="user_email">
                                <el-input v-model="registerForm.user_email" placeholder="邮箱"><span>dsfsf</span></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="user_id_number">
                                <el-input v-model="registerForm.user_id_number" placeholder="身份证号"><span>dsfsf</span></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="user_type">
                                <el-input v-model="registerForm.user_type" placeholder="用户类型(成人/学生)"><span>dsfsf</span></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="user_gender">
                                <el-input v-model="registerForm.user_gender" placeholder="性别"><span>dsfsf</span></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="user_address">
                                <el-input v-model="registerForm.user_address" placeholder="地址"><span>dsfsf</span></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('registerForm')" class="submit_btn">注册</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
    import {register} from '@/api/getData'
    import {mapActions, mapState} from 'vuex'
    import {setCookie,getCookie} from "../config/store_cookie";

    export default {
        data(){
            return {
                registerForm: {
                    user_phone_number: '',
                    user_password: '',
                    user_password_2:'',
                    user_real_name:'',
                    user_email:'',
                    user_id_number:'',
                    user_type:'',
                    user_gender:'',
                    user_address:''

                },
                rules: {
                    user_phone_number: [
                        { required: false, message: '请输入用户名', trigger: 'blur' },
                    ],
                    user_password: [
                        { required: false, message: '请输入密码', trigger: 'blur' }
                    ],
                    user_password_2: [
                        { required: false, message: '请再次输入密码', trigger: 'blur' },
                    ],
                    user_real_name: [
                        { required: false, message: '请输入真实姓名', trigger: 'blur' }
                    ],
                    user_email: [
                        { required: false, message: '请输入邮箱', trigger: 'blur' },
                    ],
                    user_id_number: [
                        { required:false, message: '请输入身份证号', trigger: 'blur' }
                    ],
                    user_type: [
                        { required: false, message: '请输入用户类型（成人/学生）', trigger: 'blur' },
                    ],
                    user_gender: [
                        { required: false, message: '请输入性别', trigger: 'blur' }
                    ],
                    user_address: [
                        { required: false, message: '请输入地址', trigger: 'blur' }
                    ],
                },
                showLogin: true,
            }
        },

        computed: {

        },
        methods: {
            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await register({user_phone_number: this.registerForm.user_phone_number,
                            user_password: this.registerForm.user_password, user_password_2:this.registerForm.user_password_2,
                            user_real_name:this.registerForm.user_real_name,user_email:this.registerForm.user_email,user_id_number:this.registerForm.user_id_number
                        ,user_type:this.registerForm.user_type,user_gender:this.registerForm.user_gender ,user_address:this.registerForm.user_address })

                        if (res.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '注册成功'
                            });
                            this.$router.push('/')
                        }else if(res.status == 403)
                        {
                            this.$message({
                                type: 'success',
                                message: res.success
                            });
                        }
                        else if(res.status ==404){
                            this.$message({
                                type: 'success',
                                message:res.success
                            });
                        }
                        else if(res.status ==405){
                            this.$message({
                                type: 'success',
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
                });
            }
        },
        watch: {

        }
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';
    .login_page{
        background-color: #243654;
    }
    .manage_tip{
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;
        p{
            font-size: 34px;
            color: #fff;
        }
    }
    .form_contianer{
        .wh(320px, auto);
        .ctp(320px, 324px);
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        .submit_btn{
            width: 100%;
            font-size: 16px;
        }
    }
    .tip{
        font-size: 12px;
        color: red;
    }
    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
    .el-row {
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
</style>

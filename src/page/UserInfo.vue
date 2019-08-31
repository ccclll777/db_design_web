<template>
    <div class="fillcontain">
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <!--<header class="admin_title">用户信息</header>-->

            <el-card class="box-card" style="width: 1000px;margin-left: 80px;margin-top: 20px">
                <div slot="header" class="clearfix">
                    <span>个人信息</span>
                    <el-button style="float: right; padding: 3px 0"  @click="GoChangeUserInfo" type="text">修改个人信息</el-button>
                </div>
                    <el-col :span="12">
                        <div class="demo-basic--circle">
                            <div class="block"><el-avatar :size="50" :src="url"></el-avatar></div>

                        </div>
                    </el-col>
                    <!--<el-image-->
                <!--style="width: 100px; height: 100px"-->
                <!--:src="url"-->
                <!--:fit="fit"></el-image>-->
                <div  class="text item">
                    <span>真实姓名：</span><span>{{tableData.user_real_name}}</span>
                </div>
                <div  class="text item">
                    <span>电话号码：</span><span>{{tableData.user_phone_number}}</span>
                </div>
                <div  class="text item">
                    <span>邮箱：</span><span>{{tableData. user_email}}</span>
                </div>
                <div  class="text item">
                <span>用户类型：</span><span>{{tableData.user_type}}</span>
            </div>
                <div  class="text item">
                    <span>性别：</span><span>{{tableData.user_gender}}</span>
                </div>
                <div  class="text item">
                    <span>身份证号：</span><span>{{tableData.user_id_number}}</span>
                </div>
                <div  class="text item">
                    <span>地址：</span><span>{{tableData.user_address}}</span>
                </div>

            </el-card>

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
                url: 'https://39.105.44.114/123.jpeg'
            }
        },
        created(){
                    this.initData();
        },
    	components: {
    		headTop,
    	},
        computed: {
            ...mapState(['adminInfo']),
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
                    this.tableData = UserInfoData.data;
                }else{
                    this.$message({
                        type: 'error',
                        message: '失败'
                    });
                }
            },
            GoChangeUserInfo()
            {
                this.$router.push('/ChangeUserInfo      ')
            }
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

<template>
    <div class="fillcontain">
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <header class="admin_title">乘客信息</header>

        <el-card class="box-card"  v-for="(tableData)  in tableDatas" style="width: 1000px;margin-left: 80px;margin-top: 20px">
            <div slot="header" class="clearfix">
                <span>{{tableData.passenger_real_name}}</span>
                <el-button style="float: right; padding: 3px 0"  @click="DeletePassengerInfo(tableData.passenger_phone_number)" type="text">删除乘客信息</el-button>
            </div>
            <div  class="text item">
                <span>电话号码：</span><span>{{tableData.passenger_phone_number}}</span>
            </div>
            <div v-if="tableData.passenger_type == 1 " class="text item">
                <span>用户类型：</span><span>成人</span>
            </div>
            <div  v-else class="text item">
                <span>用户类型：</span><span>学生</span>
            </div>
            <div  class="text item">
                <span>身份证号：</span><span>{{tableData.passenger_id_number}}</span>
            </div>
            <div  class="text item">
                <span>地址：</span><span>{{tableData.passenger_address}}</span>
            </div>

        </el-card>

    </div>

</template>

<script>
    import headTop from '../components/headTop'
    import {mapState} from 'vuex'
    import {getPassengerInfo,deletePassengerInfo} from '@/api/getData'
    import {setCookie,getCookie} from "../config/store_cookie";
    export default {
        data(){
            return {
                tableDatas:[
                    {
                    }
                ]
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
                const PassengerInfoData = await getPassengerInfo({token:getCookie("token")})
                if (PassengerInfoData.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '成功'
                    });
                    this.tableDatas = PassengerInfoData.passengerInfos;
                    console.log(this.tableDatas)
                }else{
                    this.$message({
                        type: 'error',
                        message: res.success
                    });
                }
            },
             DeletePassengerInfo(passenger_phone_number)
            {
                console.log(passenger_phone_number);
                this.deletepassenger(passenger_phone_number);

            },
            async deletepassenger(passenger_phone_number)
            {
                console.log(passenger_phone_number);
                const DeletePassengerInfo = await deletePassengerInfo({token:getCookie("token"),passenger_phone_number:passenger_phone_number})
                if (DeletePassengerInfo .status == 1) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });

                    this.initData();
                }else{
                    this.$message({
                        type: 'error',
                        message: res.success
                    });
                }
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

<template>
    <div class="fillcontain">
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="乘客姓名">
                                <span>{{ props.row.passenger_real_name }}</span>
                            </el-form-item>
                            <el-form-item label="乘客电话">
                                <span>{{ props.row.passenger_phone_number}}</span>
                            </el-form-item>
                            <el-form-item label="乘客身份证">
                                <span>{{ props.row.passenger_id_number }}</span>
                            </el-form-item>
                            <el-form-item label="订单金额">
                                <span>{{ props.row.order_money }}</span>
                            </el-form-item>
                            <!--<el-form-item label="联系电话">-->
                                <!--<span>{{ props.row.phone }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="评分">-->
                                <!--<span>{{ props.row.rating }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="销售量">-->
                                <!--<span>{{ props.row.recent_order_num }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="分类">-->
                                <!--<span>{{ props.row.category }}</span>-->
                            <!--</el-form-item>-->
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="订单号"
                    prop="order_id">
                </el-table-column>
                <el-table-column
                    label="乘客姓名"
                    prop="passenger_real_name">
                </el-table-column>
                <el-table-column
                    label="车次"
                    prop="train_number">
                </el-table-column>
                <el-table-column
                    label="出发站"
                    prop="start_station_name">
                </el-table-column>
                <el-table-column
                    label="到达站"
                    prop="end_station_name">
                </el-table-column>
                <el-table-column
                    label="车厢号"
                    prop="carriage_no">
                </el-table-column>
                <el-table-column
                    label="座位类型"
                    prop="seat_type">
                </el-table-column>
                <el-table-column
                    label="座位号"
                    prop="seat_no">
                </el-table-column>
                <el-table-column
                    label="开车日期"
                    prop="start_date">
                </el-table-column>
                <el-table-column
                    label="开车时间"
                    prop="start_time">
                </el-table-column>
                <el-table-column
                    label="订单状态"
                    prop="order_status">
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop';
    import {getAllOrderList} from '@/api/getData';
    import {setCookie,getCookie} from "../config/store_cookie";
    export default {
        data(){
            return {

                tableData: [
                ],
                currentRow: null,
                offset: 0,
                limit:10 ,
                count: 0,
                currentPage: 1

            }
        },
        created(){
            this.initData();
        },
        components: {
            headTop,
        },
        methods: {
            async initData(){
                try{

                    const res = await getAllOrderList({token:getCookie("token")});
                    if (res.status == 1) {

                        this.tableData = [];
                        this.tableData = res.getAllOrderListList;
                        this.count = res.getAllOrderListList.length;
                        this.getLists();
                        this.$message({
                            type: 'success',
                            message: '获取订单信息成功'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: '获取订单信息失败'
                        });
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
               this.getLists();
            },
            async getLists()
            {
                try{
                    const res2 = await getAllOrderList({token:getCookie("token")});
                    if (res2.status == 1) {

                        console.log("getLists")
                        this.tableData = [];
                        for(let i = this.offset ; i <this.offset+this.limit; i++)
                        {
                            if(i< this.offset + res2.getAllOrderListList.length)
                            {
                                this.tableData.push(res2.getAllOrderListList[i]);
                                console.log(res2.getAllOrderListList[i]);
                            }

                        }
                        this.$message({
                            type: 'success',
                            message: '获取订单信息成功'
                        });

                    }else{
                        this.$message({
                            type: 'error',
                            message: '获取订单信息失败'
                        });
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            }

            },
        }
    </script>

    <style lang="less">
        @import '../style/mixin';
        .demo-table-expand {
            font-size: 0;
        }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
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
</style>

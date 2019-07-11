<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-form :model="searchForm"  ref="searchForm">
                <el-row :gutter="20" style="margin-top: 10px">
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <el-input v-model="searchForm.train_number" placeholder="请输入要搜索的列车号">

                        </el-input>

                    </div>
                    </el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">
                        <el-button type="primary" round  @click="submitForm('searchForm')">搜索</el-button>
                    </div>
                    </el-col>
                </el-row>
            </el-form>
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100% ;margin-top: 20px">
                <el-table-column

                    property="station_no"
                    label="站序"
                >
                </el-table-column>
                <el-table-column
                    property="station_name"
                    label="车站名"
                >
                </el-table-column>
                <el-table-column
                    property="train_number"
                    label="车次"
                >
                </el-table-column>
                <el-table-column
                    property="arrive_time"
                    label="到达时间">
                </el-table-column>
                <el-table-column
                    property="start_time"
                    label="出发时间">
                </el-table-column>

                <el-table-column
                    property="running_time"
                    label="历时">
                </el-table-column>
                <el-table-column
                    property="arrive_day_str"
                    label="到达日期">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <!--<el-pagination-->
                <!--@size-change="handleSizeChange"-->
                <!--@current-change="handleCurrentChange"-->
                <!--:current-page="currentPage"-->
                <!--:page-size="20"-->
                <!--layout="total, prev, pager, next"-->
                <!--:total="count">-->
                <!--</el-pagination>-->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="limit"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {SearchTrainParkingInfo} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [
                ],searchForm:
                    {
                        train_number: ''
                    }
                ,
                currentRow: null,
                offset: 0,
                limit:20 ,
                count: 0,
                currentPage: 1

            }
        },
        components: {
            headTop,
        },
        created(){
        },
        methods: {
            async initData(){

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getLists()
            },
            async getLists(){


            },
            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await SearchTrainParkingInfo({train_number:this.searchForm.train_number})
                        if (res.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '搜索成功'
                            });
                            this.tableData = res.trainParkingInfo;
                        }else{
                            this.$message({
                                type: 'error',
                                message: '搜索失败，没有对应的列车'
                            });
                        }
                    }

                });
            },
            async showAll()
            {
                this.initData();

            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>

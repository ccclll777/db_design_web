<template>
    <div class="fillcontain">
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <el-form :model="searchForm"  ref="searchForm">
            <el-row :gutter="20" style="margin-left: 300px;margin-top: 10px;width: 800px">
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-autocomplete
                        class="inline-input"
                        v-model="searchForm.start_station"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入始发站"
                        :trigger-on-focus="true"
                        @select="handleSelect"
                    ></el-autocomplete>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple" style="margin-left: 20px">
                    <el-autocomplete
                        class="inline-input"
                        v-model="searchForm.end_station"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入终点站"
                        :trigger-on-focus="true"
                        @select="handleSelect"
                    ></el-autocomplete>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-button type="primary" round  @click="submitForm('searchForm')">搜索</el-button>
                </div></el-col>
                <el-switch
                    style="margin-top: 30px;margin-left: 20px"
                    v-model="value1"
                    @click.native="handelUpdate()"
                    inactive-text="按开车时间排序"
                    active-text="按运行时间排序">
                </el-switch>
            </el-row>
        </el-form>

        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table
                        :data="props.row.tableData_c"
                        align="center"
                        stripe>

                        <el-table-column
                            label="车次"
                            prop="train_number">
                        </el-table-column>
                        <el-table-column
                            label="出发站"
                            prop="start_station">
                        </el-table-column>
                        <el-table-column
                            label="到达站"
                            prop="end_station">
                        </el-table-column>
                        <el-table-column
                            label="出发时间"
                            prop="start_time">
                        </el-table-column>
                        <el-table-column
                            label="到达时间"
                            prop="arrive_time">
                        </el-table-column>
                        <el-table-column
                            label="运行及停靠时间"
                            prop="running_time">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
                label="出发站"
                prop="start_station_name">
            </el-table-column>
            <el-table-column
                label="车次"
                prop="train_number_1">
            </el-table-column>
            <el-table-column
                label="出发时间"
                prop="start_time_1">
            </el-table-column>
            <el-table-column
                label="到达时间"
                prop="arrive_time_1">
            </el-table-column>
            <el-table-column
                label="换乘车站"
                prop="transfer_station_name">
            </el-table-column>
            <el-table-column
                label="换乘用时"
                prop="transfer_time">
            </el-table-column>
            <el-table-column
                label="车次"
                prop="train_number_2">
            </el-table-column>
            <el-table-column
                label="出发时间"
                prop="start_time_2">
            </el-table-column>
            <el-table-column
                label="到达时间"
                prop="arrive_time_2">
            </el-table-column>
            <el-table-column
                label="到达站"
                prop="arrive_station_name">
            </el-table-column>
            <el-table-column
                label="总用时"
                prop="sum_running_time">
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="limit"
            layout="total, prev, pager, next, jumper"
            :total="count">
        </el-pagination>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {searchTransferSchedule,getTrainScheduleList,getAllStationName} from '@/api/getData'
    export default {
        data(){
            return {
                value1:false,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [

        ],
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
                searchForm:
                    {
                        start_station: '',
                        end_station:"",

                    },
                currentRow: null,
                offset: 0,
                limit:5 ,
                count: 0,
                currentPage: 1,
                stationData:[],
            }
        },
        async created(){
            const res = await getAllStationName()
            this.stationData = res.dataLists;
        },
        components: {
            headTop,
        },
        methods: {

            async submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await searchTransferSchedule({train_start_station:this.searchForm.start_station , train_end_station:this.searchForm.end_station});
                            if(res.status == 1)
                            {
                                    this.tableData = [];
                                    this.count = res.trainTransferScheduleList.length;
                                for(let i = 0; i< this.count ; i++)
                                {
                                    let temp = {};
                                    temp.start_station_name = res.trainTransferScheduleList[i].start_station_name;
                                    temp.train_number_1 = res.trainTransferScheduleList[i].train_number_1;
                                    temp.start_time_1 = res.trainTransferScheduleList[i].start_time_1;
                                    temp.arrive_time_1 = res.trainTransferScheduleList[i].arrive_time_1;
                                    temp.transfer_station_name = res.trainTransferScheduleList[i].transfer_station_name;
                                    temp.train_number_2 = res.trainTransferScheduleList[i].train_number_2;
                                    temp.start_time_2 = res.trainTransferScheduleList[i].start_time_2;
                                    temp.arrive_time_2 = res.trainTransferScheduleList[i].arrive_time_2;
                                    temp.arrive_station_name =  res.trainTransferScheduleList[i].end_station_name;
                                    temp.transfer_time = this.getMin(res.trainTransferScheduleList[i].arrive_time_1 ,  res.trainTransferScheduleList[i].start_time_2)
                                    temp.sum_running_time = this.getSumTime(temp.transfer_time,this.getMin(res.trainTransferScheduleList[i].start_running_time_1 ,  res.trainTransferScheduleList[i].end_running_time_1),
                                        this.getMin(res.trainTransferScheduleList[i].start_running_time_2 ,  res.trainTransferScheduleList[i].end_running_time_2))

                                }
                                    this.getLists();
                                this.$message({
                                    type: 'success',
                                    message: '查询成功'

                                });
                            }
                            else
                            {
                                this.$message({
                                    type: 'danger',
                                    message: '搜索失败'

                                });
                            }
                    }

                });
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
            const res = await searchTransferSchedule({train_start_station:this.searchForm.start_station , train_end_station:this.searchForm.end_station});
            if(res.status == 1) {

                this.tableData = [];
                for (let i = this.offset; i <  this.offset+this.limit; i++) {
                    let temp = {};
                    temp.start_station_name = res.trainTransferScheduleList[i].start_station_name;
                    temp.train_number_1 = res.trainTransferScheduleList[i].train_number_1;
                    temp.start_time_1 = res.trainTransferScheduleList[i].start_time_1;
                    temp.arrive_time_1 = res.trainTransferScheduleList[i].arrive_time_1;
                    temp.transfer_station_name = res.trainTransferScheduleList[i].transfer_station_name;
                    temp.train_number_2 = res.trainTransferScheduleList[i].train_number_2;
                    temp.start_time_2 = res.trainTransferScheduleList[i].start_time_2;
                    temp.arrive_time_2 = res.trainTransferScheduleList[i].arrive_time_2;
                    temp.arrive_station_name = res.trainTransferScheduleList[i].end_station_name;
                    temp.transfer_time = this.getMin(res.trainTransferScheduleList[i].arrive_time_1 ,  res.trainTransferScheduleList[i].start_time_2)
                    temp.sum_running_time = this.getSumTime(temp.transfer_time,this.getMin(res.trainTransferScheduleList[i].start_running_time_1 ,  res.trainTransferScheduleList[i].end_running_time_1),
                        this.getMin(res.trainTransferScheduleList[i].start_running_time_2 ,  res.trainTransferScheduleList[i].end_running_time_2))
                    var tableData_c = [];
                    const TrainScheduleList  = await getTrainScheduleList({train_start_station_no:res.trainTransferScheduleList[i].start_station_no , train_end_station_no:res.trainTransferScheduleList[i].transfer_station_no_1 ,train_no :res.trainTransferScheduleList[i].train_no_1})
                    if(TrainScheduleList.status == 1)
                    {
                        for(var j = 0 ; j < TrainScheduleList.trainScheduleInfoList.length ; j++ )
                        {
                            var tableData_temp = {}
                            tableData_temp.train_number = TrainScheduleList.trainScheduleInfoList[j].train_number+"--"+j;
                            tableData_temp.start_station =TrainScheduleList.trainScheduleInfoList[j].start_station;
                            tableData_temp.end_station = TrainScheduleList.trainScheduleInfoList[j].end_station;
                            tableData_temp.start_time = TrainScheduleList.trainScheduleInfoList[j].start_time;
                            tableData_temp.arrive_time = TrainScheduleList.trainScheduleInfoList[j].arrive_time;
                            let start_running_time = TrainScheduleList.trainScheduleInfoList[j].start_running_time;
                            let end_running_time = TrainScheduleList.trainScheduleInfoList[j].end_running_time;
                            let start_running_time2 = start_running_time.split(":");
                            let end_running_time2 = end_running_time.split(":");
                            let start_second =  parseInt(start_running_time2[0]) *60   + parseInt(start_running_time2[1]);
                            let end_second =  parseInt(end_running_time2[0]) *60   + parseInt(end_running_time2[1]);
                            let sub  = end_second -start_second;
                            let h = Math.floor(sub/60);
                            let min = sub%60;
                            let h2   =   h.toString();
                            let min2   =   min.toString();
                            let min3 = "";
                            let h3 = "";
                            if(h2.length == 1)
                            {
                                h3 = "0" +h2;
                            }
                            else
                            {
                                h3 = h2;
                            }
                            if(min2.length == 1)
                            {
                                min3 = "0" +min2;
                            }
                            else
                            {
                                min3 = min2;
                            }

                            let result = h3+":"+min3;
                            tableData_temp.running_time = result;
                            tableData_c.push(tableData_temp);


                        }

                    }
                    const TrainScheduleList_2  = await getTrainScheduleList({train_start_station_no:res.trainTransferScheduleList[i].transfer_station_no_2 , train_end_station_no:res.trainTransferScheduleList[i].end_station_no ,train_no :res.trainTransferScheduleList[i].train_no_2})
                    if(TrainScheduleList_2.status == 1)
                    {

                        for(var j = 0 ; j < TrainScheduleList_2.trainScheduleInfoList.length ; j++ )
                        {
                            var tableData_temp = {}
                            tableData_temp.train_number = TrainScheduleList_2.trainScheduleInfoList[j].train_number+"--"+j;
                            tableData_temp.start_station =TrainScheduleList_2.trainScheduleInfoList[j].start_station;
                            tableData_temp.end_station = TrainScheduleList_2.trainScheduleInfoList[j].end_station;
                            tableData_temp.start_time = TrainScheduleList_2.trainScheduleInfoList[j].start_time;
                            tableData_temp.arrive_time = TrainScheduleList_2.trainScheduleInfoList[j].arrive_time;
                            let start_running_time = TrainScheduleList_2.trainScheduleInfoList[j].start_running_time;
                            let end_running_time = TrainScheduleList_2.trainScheduleInfoList[j].end_running_time;
                            let start_running_time2 = start_running_time.split(":");
                            let end_running_time2 = end_running_time.split(":");
                            let start_second =  parseInt(start_running_time2[0]) *60   + parseInt(start_running_time2[1]);
                            let end_second =  parseInt(end_running_time2[0]) *60   + parseInt(end_running_time2[1]);
                            let sub  = end_second -start_second;
                            let h = Math.floor(sub/60);
                            let min = sub%60;
                            let h2   =   h.toString();
                            let min2   =   min.toString();
                            let min3 = "";
                            let h3 = "";
                            if(h2.length == 1)
                            {
                                h3 = "0" +h2;
                            }
                            else
                            {
                                h3 = h2;
                            }
                            if(min2.length == 1)
                            {
                                min3 = "0" +min2;
                            }
                            else
                            {
                                min3 = min2;
                            }

                            let result = h3+":"+min3;
                            tableData_temp.running_time = result;
                            tableData_c.push(tableData_temp);


                        }

                    }
                    temp.tableData_c = tableData_c;
                    this.tableData.push(temp);
                }
                this.TrainRank();

            }
            else
            {
                this.$message({
                    type: 'error',
                    message: '搜索失败'

                });
            }
        },
            getMin(time1,time2)
            {
                let start_running_time2 = time1.split(":");
                let end_running_time2 = time2.split(":");
                let start_second =  parseInt(start_running_time2[0]) *60   + parseInt(start_running_time2[1]);
                let end_second =  parseInt(end_running_time2[0]) *60   + parseInt(end_running_time2[1]);
                let sub  = end_second -start_second;
                let h = Math.floor(sub/60);
                let min = sub%60;
                let h2   =   h.toString();
                let min2   =   min.toString();
                let min3 = "";
                let h3 = "";
                if(h2.length == 1)
                {
                    h3 = "0" +h2;
                }
                else
                {
                    h3 = h2;
                }
                if(min2.length == 1)
                {
                    min3 = "0" +min2;
                }
                else
                {
                    min3 = min2;
                }

                let result = h3+":"+min3;
                return result
            },
            getSumTime(time1,time2,time3)
            {
                let time4 = time1.split(":");
                let time5 = time2.split(":");
                let time6 = time3.split(":");
                let time7 =  parseInt(time4[0]) *60   + parseInt(time4[1]);
                let time8 =  parseInt(time5[0]) *60   + parseInt(time5[1]);
                let time9 =  parseInt(time6[0]) *60   + parseInt(time6[1]);
                let result_time = time7+time8+time9;
                let h = Math.floor(result_time/60);
                let min = result_time%60;
                let h2   =   h.toString();
                let min2   =   min.toString();
                let min3 = "";
                let h3 = "";
                if(h2.length == 1)
                {
                    h3 = "0" +h2;
                }
                else
                {
                    h3 = h2;
                }
                if(min2.length == 1)
                {
                    min3 = "0" +min2;
                }
                else
                {
                    min3 = min2;
                }

                let result = h3+":"+min3;
                return result

            },
            TrainRank()
            {

                console.log(11111)
                if(this.value1 === false)
                {
                    for(let i = 0 ; i < this.tableData.length ; i++)
                    {
                        for(let j = 0 ; j <this.tableData.length - i -1 ; j++ )
                        {
                            if(this.transferTime(this.tableData[j].start_time_1) >this.transferTime(this.tableData[j+1].start_time_1))
                            {
                                let temp = this.tableData[j];
                                this.tableData[j] = this.tableData[j+1];
                                this.tableData[j+1] = temp;
                            }
                        }
                    }
                }
                else
                {
                    for(let i = 0 ; i < this.tableData.length ; i++)
                    {
                        for(let j = 0 ; j <this.tableData.length - i -1 ; j++ )
                        {
                            if(this.transferTime(this.tableData[j].sum_running_time) >this.transferTime(this.tableData[j+1].sum_running_time))
                            {
                                let temp = this.tableData[j];
                                this.tableData[j] = this.tableData[j+1];
                                this.tableData[j+1] = temp;
                            }
                        }
                    }
                }
            },
            transferTime(time)
            {
                let time2 = time.split(":");
                let second =  parseInt(time2[0]) *60   + parseInt(time2[1]);
                return second;
            },
            handelUpdate()
            {
                this.TrainRank();
            },
            async querySearch(queryString, cb) {
                var houseNumberList = this.stationData;
                let results = queryString ? houseNumberList.filter(this.createFilter(queryString)) : houseNumberList;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 1000 * Math.random());

            },
            createFilter(queryString) {
                return (houseNumber) => {
                    return (houseNumber.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
                };


            },




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

<template>
    <div class="fillcontain">
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <el-form :model="searchForm"  ref="searchForm">
            <el-row :gutter="20" style="margin-left: 180px;margin-top: 10px;width: 1000px">
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
                <el-col :span="6"><div class="grid-content bg-purple" style="margin-left: 20px">
                    <div class="block">
                        <el-date-picker
                            v-model="searchForm.datetime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
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
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-row>
                                <el-col :span="12"><div class="grid-content bg-purple">
                                    <el-form-item label="车次">
                                        <span>{{ props.row.train_number_1 }}</span>
                                    </el-form-item>
                                    <el-form-item label="特等座/软卧">
                                        <span>{{ props.row.high_seat_price_1 }}</span>
                                    </el-form-item>
                                    <el-form-item label="一等座/硬卧">
                                        <span>{{ props.row.medium_seat_price_1 }}</span>
                                    </el-form-item>
                                    <el-form-item label="二等座/硬座">
                                        <span>{{ props.row.low_seat_price_1 }}</span>
                                    </el-form-item>
                                </div></el-col>

                                <el-col :span="12"><div class="grid-content bg-purple-light">

                                    <el-form-item label="车次">
                                        <span>{{ props.row.train_number_2 }}</span>
                                    </el-form-item>
                                    <el-form-item label="特等座/软卧">
                                        <span>{{ props.row.high_seat_price_2 }}</span>
                                    </el-form-item>
                                    <el-form-item label="一等座/硬卧">
                                        <span>{{ props.row.medium_seat_price_2 }}</span>
                                    </el-form-item>
                                    <el-form-item label="二等座/硬座">
                                        <span>{{ props.row.low_seat_price_2 }}</span>
                                    </el-form-item>
                                </div></el-col>
                            </el-row>

                        </el-form>
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
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleSearch(searchForm.datetime,scope.row.train_no_1,scope.row.start_station_no,scope.row.transfer_station_no_1,scope.row.train_number_1,scope.row.train_no_2,scope.row.train_number_2,scope.row.transfer_station_no_2,scope.row.end_station_no)">查看余票</el-button>
                        <el-button
                            size="mini"
                            type="Success"
                            @click="handleBuy(searchForm.datetime,scope.row.train_no_1,scope.row.start_station_no,
                            scope.row.transfer_station_no_1,scope.row.train_number_1,scope.row.train_no_2,scope.row.train_number_2,
                            scope.row.transfer_station_no_2,scope.row.end_station_no,scope.row.high_seat_price_1,
                            scope.row.medium_seat_price_1,scope.row.low_seat_price_1,scope.row.high_seat_price_2,
                            scope.row.medium_seat_price_2,scope.row.low_seat_price_2)">预定</el-button>
                    </template>
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

            <el-dialog title="余座数" :visible.sync="dialogTableVisible" style="width: 1500px">
                <el-table :data="seat_count_list">

                    <el-table-column property="train_number" label="车次" width="150"></el-table-column>
                    <el-table-column property="carriage_no" label="车厢号" width="200"></el-table-column>
                    <el-table-column property="seat_type" label="类型"></el-table-column>
                    <el-table-column property="seat_count" label="数量"></el-table-column>
                </el-table>


            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {queryTrainTransferTicket,queryTransferTrainTicketNum,getAllStationName} from '@/api/getData'
    import {TickerOrder} from "../router/index"
    export default {
        data(){
            return {
                value1:false,
                tableData: [

                ],
                selectTable: {},
                searchForm:
                    {
                        start_station: '',
                        end_station:"",
                        datetime:""

                    },
                seat_count_list:[],
                dialogTableVisible: false,
                dialogTableVisible_GD: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
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
                        let date;
                        date= new Date(this.searchForm.datetime);

                        let datetime2 = date.getFullYear()+'-'+this.checkTime(date.getMonth()+1)+'-'+this.checkTime(date.getDate());
                        console.log(this.searchForm.start_station+datetime2)
                        this.tableData = [];
                        const res = await queryTrainTransferTicket({train_start_station:this.searchForm.start_station , train_end_station:this.searchForm.end_station ,datetime :datetime2})
                        if(res.status == 1)
                        {
                            this.tableData  =[];
                            for(let i =0 ;i <res.trainTransferTicketPriceInfoList.length ; i++)
                            {
                                let temp = {};
                                temp.train_no_1 = res.trainTransferTicketPriceInfoList[i].train_no_1;
                                temp.train_no_2 = res.trainTransferTicketPriceInfoList[i].train_no_2;
                                temp.end_station_no = res.trainTransferTicketPriceInfoList[i].end_station_no;
                                temp.start_station_no = res.trainTransferTicketPriceInfoList[i].start_station_no;
                                temp.transfer_station_no_1 = res.trainTransferTicketPriceInfoList[i].transfer_station_no_1;
                                temp.transfer_station_no_2 = res.trainTransferTicketPriceInfoList[i].transfer_station_no_2;
                                temp.start_station_name =res.trainTransferTicketPriceInfoList[i].start_station_name;
                                    temp.train_number_1 =res.trainTransferTicketPriceInfoList[i].train_number_1;
                                temp.start_time_1=res.trainTransferTicketPriceInfoList[i].start_time_1;
                                temp.arrive_time_1=res.trainTransferTicketPriceInfoList[i].arrive_time_1;
                                temp.transfer_station_name=res.trainTransferTicketPriceInfoList[i].transfer_station_name;
                                // temp.transfer_time=res.trainTransferTicketPriceInfoList[i].
                                temp.train_number_2=res.trainTransferTicketPriceInfoList[i].train_number_2;
                                temp.start_time_2=res.trainTransferTicketPriceInfoList[i].start_time_2;
                                temp.arrive_time_2=res.trainTransferTicketPriceInfoList[i].arrive_time_2;
                                temp.arrive_station_name=res.trainTransferTicketPriceInfoList[i].end_station_name;
                                // temp.sum_running_time=res.trainTransferTicketPriceInfoList[i].
                                temp.high_seat_price_1=res.trainTransferTicketPriceInfoList[i].high_seat_price_1;
                                temp.medium_seat_price_1=res.trainTransferTicketPriceInfoList[i].medium_seat_price_1;
                                temp.low_seat_price_1=res.trainTransferTicketPriceInfoList[i].low_seat_price_1;
                                temp.high_seat_price_2=res.trainTransferTicketPriceInfoList[i].high_seat_price_2;
                                temp.medium_seat_price_2=res.trainTransferTicketPriceInfoList[i].medium_seat_price_2;
                                temp.low_seat_price_2=res.trainTransferTicketPriceInfoList[i].low_seat_price_2;
                                temp.transfer_time = this.getMin(res.trainTransferTicketPriceInfoList[i].arrive_time_1 ,  res.trainTransferTicketPriceInfoList[i].start_time_2)
                                temp.sum_running_time = this.getSumTime(temp.transfer_time,this.getMin(res.trainTransferTicketPriceInfoList[i].start_running_time_1 ,  res.trainTransferTicketPriceInfoList[i].end_running_time_1),
                                    this.getMin(res.trainTransferTicketPriceInfoList[i].start_running_time_2 ,  res.trainTransferTicketPriceInfoList[i].end_running_time_2));
                                this.tableData.push(temp);

                            }
                            this.TrainRank();
                            this.$message({
                                type: 'success',
                                message: '查询成功'
                            });

                        }
                        else if(res.status == 404)
                        {
                            this.$message({
                                type: 'error',
                                message: '没有符合条件的列车'
                            });
                        }else if(res.status == 406)
                        {
                            this.$message({
                                type: 'error',
                                message: '没有符合条件的列车'
                            });
                        }
                        else {
                            this.$message({
                                type: 'error',
                                message: '查询失败'
                            });
                        }
                    }

                });
            },

            checkTime(i){
                if(i<10){

                    i = '0'+i

                }

                return i
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getLists()
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
           async handleSearch(datetime,train_no_1,start_station_no,transfer_station_no_1,train_number_1,train_no_2,train_number_2,transfer_station_no_2,end_station_no){
                let date;
                date= new Date(datetime);

                let datetime2 = date.getFullYear()+'-'+this.checkTime(date.getMonth()+1)+'-'+this.checkTime(date.getDate());

                const res = await queryTransferTrainTicketNum({datetime:datetime2, train_no_1:train_no_1 ,start_station_no :start_station_no,transfer_station_no_1:transfer_station_no_1,train_number_1:train_number_1,
                    train_no_2:train_no_2 ,train_number_2:train_number_2,transfer_station_no_2:transfer_station_no_2,end_station_no:end_station_no})
               if(res.status == 1)
               {
                   this.seat_count_list = [];
                  for(let i = 0 ; i< res.trainTransferSeatCountList.length ; i++)
                  {
                      let temp  = {};
                      temp.train_number = res.trainTransferSeatCountList[i].train_number;
                      temp.carriage_no = res.trainTransferSeatCountList[i].carriage_no;
                      temp.seat_type = res.trainTransferSeatCountList[i].seat_type;
                      temp.seat_count = res.trainTransferSeatCountList[i].seat_count;
                    this.seat_count_list.push(temp);
                  }
                   this.$message({
                       type: 'success',
                       message: '查询成功'
                   });
                   this.dialogTableVisible = true;
               }
               else
               {
                   this.$message({
                       type: 'error',
                       message: '查询失败'
                   });
               }

            },
            handleBuy(datetime,train_no_1,start_station_no,
       transfer_station_no_1,train_number_1,train_no_2,train_number_2,
        transfer_station_no_2,end_station_no,high_seat_price_1,
        medium_seat_price_1,low_seat_price_1,high_seat_price_2,
        medium_seat_price_2,low_seat_price_2)
            {
                let date;
                date= new Date(datetime);
                let datetime2 = date.getFullYear()+'-'+this.checkTime(date.getMonth()+1)+'-'+this.checkTime(date.getDate());
                this.$router.push({
                    path: '/TransferTicketOrder',
                    query: {
                        datetime: datetime2,
                        train_no_1: train_no_1,
                        train_number_1:train_number_1,
                        high_seat_price_1:high_seat_price_1,
                        medium_seat_price_1:medium_seat_price_1,
                        low_seat_price_1:low_seat_price_1,
                        start_station_no:start_station_no,
                        transfer_station_no_1:transfer_station_no_1,
                        transfer_station_no_2:transfer_station_no_2,
                        end_station_no:end_station_no,
                        train_no_2: train_no_2,
                        train_number_2:train_number_2,
                        high_seat_price_2:high_seat_price_2,
                        medium_seat_price_2:medium_seat_price_2,
                        low_seat_price_2:low_seat_price_2,
                    }
                    /*query: {
                        key: 'key',
                        msgKey: this.msg
                    }*/
                })
            },
            TrainRank()
            {
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

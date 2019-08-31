<template>

    <div>
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <el-steps :active="active" align-center style="margin-top: 10px">
            <el-step title="添加乘客" ></el-step>
            <el-step title="选择座位" ></el-step>
            <el-step title="付款" ></el-step>
            <el-step title="订票成功" ></el-step>
        </el-steps>
        <el-table :data="passenger_data" v-show="show_passenger" style="width: 1000px;margin-left: 80px;margin-top: 20px">

            <el-table-column property="passenger_real_name" label="乘客姓名" ></el-table-column>
            <el-table-column property="passenger_phone_number" label="乘客电话号码" ></el-table-column>
            <el-table-column property="passenger_id_number" label="身份证号"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="deletepassenger(scope.row.passenger_phone_number)">删除</el-button>

                </template>
            </el-table-column>

        </el-table>

        <el-table :data="passenger_data" v-show="show_passenger_ticket" style="width: 1000px;margin-left: 80px;margin-top: 20px">

            <el-table-column property="passenger_real_name" label="乘客姓名" ></el-table-column>
            <el-table-column property="passenger_phone_number" label="乘客电话号码" ></el-table-column>
            <el-table-column property="passenger_id_number" label="身份证号"></el-table-column>
            <el-table-column property="carriage_no" label="车厢号"></el-table-column>
            <el-table-column property="seat_type" label="座位类型"></el-table-column>
            <el-table-column property="seat_no" label="座位号"></el-table-column>

        </el-table>

        <div v-show="active === 1 && dialogTableVisible" style="margin-top: 40px ;margin-left: 80px">
            <el-table :data="high_seat" >

                <el-table-column property="carriage_number" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type" label="座位类型" width="100"></el-table-column>
                <el-table-column property="upper_num" label="上铺" width="200"></el-table-column>
                <el-table-column property="lower_num" label="下铺" width="200"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'上铺')">上铺</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'下铺')">下铺</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-table :data="medium_seat">

                <el-table-column property="carriage_number" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type" label="座位类型" width="100"></el-table-column>
                <el-table-column property="upper_num" label="上铺" width="130"></el-table-column>
                <el-table-column property="middle_num" label="中铺" width="130"></el-table-column>
                <el-table-column property="lower_num" label="下铺" width="130"></el-table-column>
                <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'上铺')">上铺</el-button>
                    <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'中铺')">中铺</el-button>
                    <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'下铺')">下铺</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-table :data="low_seat">

                <el-table-column property="carriage_number" label="车厢号" width="70"></el-table-column>
                <el-table-column property="seat_type" label="座位类型" width="70"></el-table-column>
                <el-table-column property="A_num" label="A座" width="55"></el-table-column>
                <el-table-column property="B_num" label="B座" width="55"></el-table-column>
                <el-table-column property="C_num" label="C座" width="55"></el-table-column>
                <el-table-column property="D_num" label="D座" width="55"></el-table-column>
                <el-table-column property="E_num" label="E座" width="55"></el-table-column>
                <el-table-column property="F_num" label="F座" width="55"></el-table-column>
                <el-table-column label="操作" width="500">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'C')">C</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'D')">D</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'E')">E</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'F')">F</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <div v-show="active === 1 && dialogTableVisible_GD" style="margin-top: 40px ;margin-left: 80px;">
            <el-table :data="high_seat_GD">

                <el-table-column property="carriage_number" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type" label="座位类型" width="100"></el-table-column>
                <el-table-column property="A_num" label="A座" width="150"></el-table-column>
                <el-table-column property="B_num" label="B座" width="150"></el-table-column>
                <el-table-column property="C_num" label="C座" width="150"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'C')">C</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="medium_seat_GD">

                <el-table-column property="carriage_number" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type" label="座位类型" width="100"></el-table-column>
                <el-table-column property="A_num" label="A座" width="115"></el-table-column>
                <el-table-column property="B_num" label="B座" width="115"></el-table-column>
                <el-table-column property="C_num" label="C座" width="115"></el-table-column>
                <el-table-column property="D_num" label="D座" width="115"></el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'C')">C</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'D')">D</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="low_seat_GD">

                <el-table-column property="carriage_number" label="车厢号" width="100"></el-table-column>
                <el-table-column property="seat_type" label="座位类型" width="100"></el-table-column>
                <el-table-column property="A_num" label="A座" width="90"></el-table-column>
                <el-table-column property="B_num" label="B座" width="90"></el-table-column>
                <el-table-column property="C_num" label="C座" width="90"></el-table-column>
                <el-table-column property="D_num" label="D座" width="90"></el-table-column>
                <el-table-column property="E_num" label="E座" width="90"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'A')">A</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'B')">B</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'C')">C</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'D')">D</el-button>
                        <el-button size="mini" type="primary" @click="handleAdd(scope.row.carriage_number,scope.row.seat_type,'E')">E</el-button>

                    </template>
                </el-table-column>
            </el-table>

        </div>

        <el-row  v-show="active === 0" >
            <div >


                <el-card class="box-card"  v-for="(tableData)  in tableDatas" style="width: 1000px;margin-left: 80px;margin-top: 20px">
                    <div slot="header" class="clearfix">
                        <span>{{tableData.passenger_real_name}}</span>
                        <el-button style="float: right; padding: 3px 0"  @click="AddPassengerInfo(tableData.passenger_real_name,tableData.passenger_phone_number,tableData.passenger_id_number)" type="text">添加</el-button>
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
        </el-row>
        <el-row  v-show="active === 2" >
            <el-table :data="passenger_data" v-show="show_order_list" style="width: 1000px;margin-left: 80px;margin-top: 20px">
                <el-table-column property="order_id" label="订单号" ></el-table-column>
                <el-table-column property="passenger_real_name" label="乘客姓名" ></el-table-column>
                <el-table-column property="passenger_phone_number" label="乘客电话号码" ></el-table-column>
                <el-table-column property="passenger_id_number" label="身份证号"></el-table-column>
                <el-table-column property="carriage_no" label="车厢号"></el-table-column>
                <el-table-column property="seat_type" label="座位类型"></el-table-column>
                <el-table-column property="seat_no" label="座位号"></el-table-column>
                <el-table-column property="seat_price" label="订单金额"></el-table-column>
            </el-table>
            <el-row style="margin-top: 20px">

                    <el-button type="primary" @click="dialogFormVisible_wx = true" style="margin-left: 300px">微信支付</el-button>


                    <el-button type="primary" @click="dialogFormVisible_zfb = true" style="margin-left: 300px">支付宝支付</el-button>

            </el-row>
            <el-button type="primary" @click="pay_success()"  style="margin-left: 500px">支付成功</el-button>

            <el-dialog title="微信支付" :visible.sync="dialogFormVisible_wx">
                <el-image
                    style="width: 300px; height: 500px ;"
                    :src="url1"
                    :fit="fit"></el-image>
            </el-dialog>
            <el-dialog title="支付宝支付" :visible.sync="dialogFormVisible_zfb">
                <el-image
                    style="width: 300px; height: 500px"
                    :src="url2"
                    :fit="fit"></el-image>
            </el-dialog>

        </el-row>
        <el-row   v-show="active === 3" >
            <div style="margin-top: 30px; margin-left: 50px;margin-right: 50px">
                <el-alert
                    title="恭喜您支付成功，请在未出行订单列表中查看"
                    type="success"
                    effect="dark">
                </el-alert>
            </div>
        </el-row>

        <el-button type="primary" round @click="next" style="margin-left: 500px;margin-top: 30px">下一步</el-button>
    </div>
</template>


<script>
    import headTop from '../components/headTop'
    import {queryTrainTicketNum,getPassengerInfo,orderTrainTicket,getOrderList,paySuccess} from '@/api/getData';
    import {setCookie,getCookie} from "../config/store_cookie";
    export default {
        name: "TicketOrder",
        data() {
            return {
                datetime:"",
                train_no:"",
                start_no:"",
                end_no:"",
                train_number:"",
                high_seat_price:"",
                medium_seat_price:"",
                low_seat_price:"",
                url2:"https://39.105.44.114/zfb.JPG",
                url1:"https://39.105.44.114/wx.JPG",
                active:0,
                dialogTableVisible: false,
                dialogTableVisible_GD: false,
                show_passenger:false,
                show_passenger_ticket:false,
                show_order_list:false,
                passenger_count:0,
                high_seat:[],
                medium_seat:[],
                low_seat:[],
                high_seat_GD:[],
                medium_seat_GD:[],
                low_seat_GD:[],
                tableDatas:[],
                passenger_data:
                [],
                ticket_data: [],
                dialogFormVisible_wx:false,
                dialogFormVisible_zfb:false,
            };
        },

        methods: {
            next() {
                this.active ++;
                if(this.active == 1)
                {
                    this.getTicketCount();
                }
                if(this.active == 2)
                {
                    this.getOrderList();
                }
                if(this.active == 4)
                {
                    this.$router.push('AllOrderList')
                }
            },
            async getTicketCount(){
                const res = await queryTrainTicketNum({datetime:this.datetime, train_no:this.train_no ,start_no :this.start_no,end_no:this.end_no,train_number:this.train_number})
                if(res.status == 1)
                {
                    if(this.train_number[0] == "G" || this.train_number[0] == "D")
                    {
                        this.high_seat_GD = [];
                        this.medium_seat_GD = [];
                        this.low_seat_GD = [];
                        for(let i = 0 ; i<res.trainRemainingSeats_gds.length ; i++)
                        {
                            if(res.trainRemainingSeats_gds[i].seat_type == "特等座")
                            {
                                let high_temp = {};
                                high_temp.carriage_number = res.trainRemainingSeats_gds[i].carriage_no;
                                high_temp.seat_type = res.trainRemainingSeats_gds[i].seat_type;
                                high_temp.A_num = res.trainRemainingSeats_gds[i].high_seat_GD_A;
                                high_temp.B_num = res.trainRemainingSeats_gds[i].high_seat_GD_B;
                                high_temp.C_num = res.trainRemainingSeats_gds[i].high_seat_GD_C;
                                this.high_seat_GD.push(high_temp);
                            }
                            if(res.trainRemainingSeats_gds[i].seat_type == "一等座")
                            {
                                let high_temp = {};
                                high_temp.carriage_number = res.trainRemainingSeats_gds[i].carriage_no;
                                high_temp.seat_type = res.trainRemainingSeats_gds[i].seat_type;
                                high_temp.A_num = res.trainRemainingSeats_gds[i].medium_seat_GD_A;
                                high_temp.B_num = res.trainRemainingSeats_gds[i].medium_seat_GD_B;
                                high_temp.C_num = res.trainRemainingSeats_gds[i].medium_seat_GD_C;
                                high_temp.D_num = res.trainRemainingSeats_gds[i].medium_seat_GD_D;
                                this.medium_seat_GD.push(high_temp);
                            }
                            if(res.trainRemainingSeats_gds[i].seat_type == "二等座")
                            {
                                let high_temp = {};
                                high_temp.carriage_number = res.trainRemainingSeats_gds[i].carriage_no;
                                high_temp.seat_type = res.trainRemainingSeats_gds[i].seat_type;
                                high_temp.A_num = res.trainRemainingSeats_gds[i].low_seat_GD_A;
                                high_temp.B_num = res.trainRemainingSeats_gds[i].low_seat_GD_B;
                                high_temp.C_num = res.trainRemainingSeats_gds[i].low_seat_GD_C;
                                high_temp.D_num = res.trainRemainingSeats_gds[i].low_seat_GD_D;
                                high_temp.E_num = res.trainRemainingSeats_gds[i].low_seat_GD_E;
                                this.low_seat_GD.push(high_temp);
                            }
                        }
                        this.dialogTableVisible_GD = true

                    }
                    else
                    {
                        this.high_seat = []
                        this.medium_seat = []
                        this.low_seat = []
                        for(let i = 0 ; i<res.trainRemainingSeats.length ; i++)
                        {
                            if(res.trainRemainingSeats[i].seat_type == "软卧")
                            {
                                let high_temp = {};
                                high_temp.carriage_number = res.trainRemainingSeats[i].carriage_no;
                                high_temp.seat_type = res.trainRemainingSeats[i].seat_type;
                                high_temp.upper_num = res.trainRemainingSeats[i].high_seat_upper;
                                high_temp.lower_num = res.trainRemainingSeats[i].high_seat_lower;
                                this.high_seat.push(high_temp);
                            }
                            if(res.trainRemainingSeats[i].seat_type == "硬卧")
                            {
                                let high_temp = {};
                                high_temp.carriage_number = res.trainRemainingSeats[i].carriage_no;
                                high_temp.seat_type = res.trainRemainingSeats[i].seat_type;
                                high_temp.upper_num = res.trainRemainingSeats[i].medium_seat_upper;
                                high_temp.middle_num = res.trainRemainingSeats[i].medium_seat_middle;
                                high_temp.lower_num = res.trainRemainingSeats[i].medium_seat_lower;
                                this.medium_seat.push(high_temp);
                            }
                            if(res.trainRemainingSeats[i].seat_type == "硬坐")
                            {
                                let high_temp = {};
                                high_temp.carriage_number = res.trainRemainingSeats[i].carriage_no;
                                high_temp.seat_type = "硬座";
                                high_temp.A_num = res.trainRemainingSeats[i].low_seat_A;
                                high_temp.B_num = res.trainRemainingSeats[i].low_seat_B;
                                high_temp.C_num = res.trainRemainingSeats[i].low_seat_C;
                                high_temp.D_num = res.trainRemainingSeats[i].low_seat_D;
                                high_temp.E_num = res.trainRemainingSeats[i].low_seat_E;
                                high_temp.F_num = res.trainRemainingSeats[i].low_seat_F;
                                this.low_seat.push(high_temp);
                            }
                        }
                        this.dialogTableVisible = true
                    }
                    this.$message({
                        type: 'message',
                        message: '查询成功'
                    });
                }
                else if(res.status == 404)
                {
                    this.$message({
                        type: 'error',
                        message: '请输入正确时间'
                    });
                }
                else
                {
                    this.$message({
                        type: 'error',
                        message: '查询失败'
                    });
                }
            },
            async getPassenger()
            {
                const PassengerInfoData = await getPassengerInfo({token:getCookie("token")})
                if (
                    PassengerInfoData.status == 1) {
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
            AddPassengerInfo(passenger_real_name,passenger_phone_number,passenger_id_number)
            {
                let passenger_d = {};
                passenger_d.passenger_real_name = passenger_real_name;
                passenger_d.passenger_phone_number = passenger_phone_number;
                passenger_d.passenger_id_number = passenger_id_number;
                this.passenger_data.push(passenger_d);
                this.passenger_count ++;
                this.$message({
                    message: '当前添加了'+this.passenger_count+"位乘客",
                    type: 'success'
                });
                this.show_passenger = true;
            },
           async handleAdd(carriage_no,seat_type,seat_number)
            {
                if(this.passenger_count >0)
                {

                    let passenger_phone_number = this.passenger_data[this.passenger_count-1].passenger_phone_number;
                    let passenger_id_number =  this.passenger_data[this.passenger_count-1].passenger_id_number;
                    console.log(this.datetime+this.train_no+this.start_no+this.end_no+this.train_number+carriage_no+seat_type+seat_number+passenger_phone_number+passenger_id_number);
                    const res = await orderTrainTicket({token:getCookie("token"),datetime:this.datetime,train_no:this.train_no,start_no:this.start_no,
                        end_no:this.end_no,train_number:this.train_number,carriage_no:carriage_no,seat_type:seat_type,seat_number:seat_number,
                        passenger_phone_number:passenger_phone_number,passenger_id_number:passenger_id_number, high_seat_price: this.high_seat_price,
                        medium_seat_price:this.medium_seat_price,low_seat_price :this.low_seat_price});
                        if(res.status ==1)
                        {
                           if(passenger_phone_number == res.passenger_phone_number)
                           {
                               this.passenger_data[this.passenger_count-1].carriage_no = res.carriage_no;
                               this.passenger_data[this.passenger_count-1].seat_type = res.seat_type;
                               this.passenger_data[this.passenger_count-1].seat_no = res.result_seat_no;
                                     this.$message({
                                   message: '乘客'+ this.passenger_data[this.passenger_count-1].passenger_real_name+'选座成功',
                                   type: 'success'
                               });
                           }
                        }
                        else if(res.status ==40008)
                        {
                            this.$message({
                                message:"该乘客有冲突的行程，无法选座",
                                type: 'warning'
                            });
                        }
                        else if(res.status == 40009)
                        {
                            this.$message({
                                message:"该乘客有冲突行程   ",
                                type: 'warning'
                            });
                        }
                    this.passenger_count --;
                        if( this.passenger_count  == 0)
                        {
                            this.show_passenger = false;
                            this.show_passenger_ticket = true;
                        }

                }
                    console.log(this.datetime+this.train_no+this.start_no+this.end_no+this.train_number+carriage_no+seat_type+seat_number);

            },
            deletepassenger(passenger_phone_number)
            {
                for(let i = 0 ; i<this.passenger_data.length ; i++)
                {
                    if(this.passenger_data[i].passenger_phone_number == passenger_phone_number)
                    {
                        this.passenger_data.splice(i,1);
                    }
                }
                this.passenger_count --;
            },
            async getOrderList()
            {

                const res = await getOrderList({token:getCookie("token"),datetime:this.datetime,train_no:this.train_no,start_no:this.start_no,
                    end_no:this.end_no});
                if(res.status == 1)
                {
                    for(let i = 0 ; i< res.getOrderListList.length ; i++)
                    {
                        for(let j = 0 ; j < this.passenger_data.length ; j++)
                        {

                            if(res.getOrderListList[i].passenger_phone_number == this.passenger_data[j].passenger_phone_number &&
                                res.getOrderListList[i].passenger_id_number == this.passenger_data[j].passenger_id_number)
                            {
                                this.passenger_data[j].order_id =  res.getOrderListList[i].order_id;
                                for(let k = 0 ; k < this.tableDatas.length ; k++)
                                {
                                    if(this.tableDatas[k].passenger_phone_number ==  this.passenger_data[j].passenger_phone_number)
                                    {
                                        if(this.tableDatas[k].passenger_type == 1)
                                        {
                                            if( this.passenger_data[j].seat_type == "二等座" )
                                            {

                                                this.passenger_data[j].seat_price = this.low_seat_price;
                                            }
                                            if( this.passenger_data[j].seat_type == "一等座" )
                                            {
                                                this.passenger_data[j].seat_price = this.medium_seat_price;
                                            }
                                            if( this.passenger_data[j].seat_type == "特等座" )
                                            {
                                                this.passenger_data[j].seat_price = this.high_seat_price;
                                            }
                                            if( this.passenger_data[j].seat_type == "硬座" )
                                            {
                                                this.passenger_data[j].seat_price = this.low_seat_price;
                                            }
                                            if( this.passenger_data[j].seat_type == "硬卧" )
                                            {
                                                this.passenger_data[j].seat_price = this.medium_seat_price;
                                            }
                                            if( this.passenger_data[j].seat_type == "软卧" )
                                            {
                                                this.passenger_data[j].seat_price = this.high_seat_price;
                                            }
                                        }
                                        else
                                        {
                                            if( this.passenger_data[j].seat_type == "二等座" )
                                            {

                                                this.passenger_data[j].seat_price =  parseInt(this.low_seat_price.substring(1,this.low_seat_price.length)) *0.75;
                                                console.log(this.low_seat_price)
                                            }
                                            if( this.passenger_data[j].seat_type == "一等座" )
                                            {
                                                this.passenger_data[j].seat_price =  parseInt(this.medium_seat_price.substring(1,this.medium_seat_price.length)) *0.75;
                                            }
                                            if( this.passenger_data[j].seat_type == "特等座" )
                                            {
                                                this.passenger_data[j].seat_price = parseInt(this.high_seat_price.substring(1,this.high_seat_price.length)) *0.75;
                                            }
                                            if( this.passenger_data[j].seat_type == "硬座" )
                                            {
                                                this.passenger_data[j].seat_price = parseInt(this.low_seat_price.substring(1,this.low_seat_price.length)) *0.5;
                                            }
                                            if( this.passenger_data[j].seat_type == "硬卧" )
                                            {
                                                this.passenger_data[j].seat_price = parseInt(this.medium_seat_price.substring(1,this.medium_seat_price.length)) *0.5;
                                            }
                                            if( this.passenger_data[j].seat_type == "软卧" )
                                            {
                                                this.passenger_data[j].seat_price = parseInt(this.high_seat_price.substring(1,this.high_seat_price.length))*0.5;
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                    this.show_passenger_ticket = false;
                    this.show_order_list = true;
                    this.$message({
                        message: '请支付您的订单',
                        type: 'success'
                    });
                }
                else
                {
                    this.$message({
                        message: '获取订单列表失败',
                        type: 'warning'
                    });
                }



            },
          async  pay_success()
            {
                var order_id_list = "";
                console.log(this.passenger_data.length);
                for(let i = 0 ; i < this.passenger_data.length ; i++)
                {
                    order_id_list = order_id_list+this.passenger_data[i].order_id +",";
                    console.log( order_id_list);
                }

                const res = await  paySuccess({token:getCookie("token"),datetime:this.datetime,train_no:this.train_no,start_no:this.start_no,
                end_no:this.end_no,order_list:order_id_list});
                if(res.status == 1)
                {
                    this.$message({
                        message: res.success,
                        type: 'success'
                    });
                    this.next();
                }
                else
                    {
                        this.$message({
                            message: "支付失败",
                            type: 'warning'
                        });
                }
            }

        },
        components: {
            headTop,
        },
        created(){
            if(this.$route.query.datetime == null || this.$route.query.train_no == null)

            {
                this.$message({
                    message: '请先选择一趟列车',
                    type: 'warning'
                });
            }else
            {
                this.datetime = this.$route.query.datetime;
                this.train_no= this.$route.query.train_no;
                this.start_no= this.$route.query.start_no;
                this.end_no= this.$route.query.end_no;
                this.train_number = this.$route.query.train_number;
                this.high_seat_price= this.$route.query.high_seat_price;
                this.medium_seat_price= this.$route.query.medium_seat_price;
                this.low_seat_price= this.$route.query.low_seat_price;

            }



        },

        mounted() {
            this.getPassenger();
        }


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

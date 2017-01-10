import {InMemoryDbService} from 'angular2-in-memory-web-api';
export class MockData implements InMemoryDbService {
    createDb() {
        let ad = [
            {
                id: 1,
                pic: 'assets/ad/ad1.jpg',
                html: `<h2>广告一</h2><div>广告一内容广告一内容广告一内容广告一内容</div>`
            },
            {
                id: 2,
                pic: 'assets/ad/ad2.jpg',
                html: `<h2>广告二</h2><div>广告二内容广告二内容广告二内容广告二内容</div>`
            },
            {
                id: 3,
                pic: 'assets/ad/ad3.jpg',
                html: `<h2>广告三</h2><div>广告三内容广告三内容广告三内容广告三内容</div>`
            },
        ];

        let parkCards = [
            {id: 1, type: "深圳通", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025336'},
            {id: 2, type: "羊城通", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025024'},
            {id: 3, type: "东莞卡", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025002'},
            {id: 4, type: "校园卡", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025106'},
            {id: 5, type: "深圳通", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025067'},
            {id: 6, type: "校园卡", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025132'},
            {id: 7, type: "东莞卡", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025054'},
            {id: 8, type: "羊城通", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025069'},
            {id: 9, type: "东莞卡", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025003'},
            {id: 10, type: "羊城通", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025019'},
            {id: 11, type: "深圳通", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025001'},
            {id: 12, type: "东莞卡", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025106'},
            {id: 13, type: "东莞卡", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025109'},
            {id: 14, type: "深圳通", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025146'},
            {id: 15, type: "羊城通", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025137'},
            {id: 16, type: "东莞卡", img: 'assets/park-card/thumbnail-totoro.jpeg', cardId: 'No.025180'},
        ];

        let rechargeLists = [
            {
                date: "2013.10.13",
                time: "09:25:36",
                type: "现金",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "深圳通",
                cardId: 'No.025336',
                money: 200
            },
            {
                date: "2013.10.13",
                time: "09:05:02",
                type: "支付宝",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "羊城通",
                cardId: 'No.025024',
                money: 55.5
            },
            {
                date: "2013.10.15",
                time: "10:02:43",
                type: "微信",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "东莞卡",
                cardId: 'No.025002',
                money: 50
            },
            {
                date: "2013.10.16",
                time: "08:00:34",
                type: "银联",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "校园卡",
                cardId: 'No.025106',
                money: 100
            },
            {
                date: "2013.10.16",
                time: "09:13:53",
                type: "银联",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "深圳通",
                cardId: 'No.025067',
                money: 20
            },
            {
                date: "2013.10.18",
                time: "07:57:25",
                type: "支付宝",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "校园卡",
                cardId: 'No.025132',
                money: 30
            },
            {
                date: "2013.10.19",
                time: "08:22:20",
                type: "支付宝",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "东莞卡",
                cardId: 'No.025054',
                money: 50
            },
            {
                date: "2013.10.19",
                time: "10:43:16",
                type: "微信",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "羊城通",
                cardId: 'No.025069',
                money: 10
            },
            {
                date: "2013.10.20",
                time: "08:03:43",
                type: "支付宝",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "东莞卡",
                cardId: 'No.025003',
                money: 200
            },
            {
                date: "2013.10.20",
                time: "10:05:40",
                type: "微信",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "羊城通",
                cardId: 'No.025019',
                money: 120
            },
            {
                date: "2013.10.20",
                time: "10:16:22",
                type: "支付宝",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "深圳通",
                cardId: 'No.025001',
                money: 100
            },
            {
                date: "2013.10.22",
                time: "08:43:33",
                type: "现金",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "东莞卡",
                cardId: 'No.025106',
                money: 100
            },
            {
                date: "2013.10.23",
                time: "08:05:13",
                type: "微信",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "东莞卡",
                cardId: 'No.025109',
                money: 50
            },
            {
                date: "2013.10.24",
                time: "08:16:25",
                type: "微信",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "深圳通",
                cardId: 'No.025146',
                money: 50
            },
            {
                date: "2013.10.25",
                time: "08:24:06",
                type: "微信",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "羊城通",
                cardId: 'No.025137',
                money: 50
            },
            {
                date: "2013.10.28",
                time: "08:35:43",
                type: "支付宝",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "东莞卡",
                cardId: 'No.025180',
                money: 30
            },
        ];

        let consumeLists = [
            {
                date: "2013.10.13",
                time: "09:25:36",
                type: "现金",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "深圳通",
                cardId: 'No.025336',
                money: '+200'
            },
            {
                date: "2013.10.13",
                time: "09:05:02",
                type: "支付宝",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "羊城通",
                cardId: 'No.025024',
                money: '+55.5'
            },
            {
                date: "2013.10.15",
                time: "10:02:43",
                type: "微信",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "东莞卡",
                cardId: 'No.025002',
                money: '-50'
            },
            {
                date: "2013.10.16",
                time: "08:00:34",
                type: "银联",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "校园卡",
                cardId: 'No.025106',
                money: '-100'
            },
            {
                date: "2013.10.16",
                time: "09:13:53",
                type: "银联",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "深圳通",
                cardId: 'No.025067',
                money: '-20'
            },
            {
                date: "2013.10.18",
                time: "07:57:25",
                type: "支付宝",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "校园卡",
                cardId: 'No.025132',
                money: '-30'
            },
            {
                date: "2013.10.19",
                time: "08:22:20",
                type: "支付宝",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "东莞卡",
                cardId: 'No.025054',
                money: '-50'
            },
            {
                date: "2013.10.19",
                time: "10:43:16",
                type: "微信",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "羊城通",
                cardId: 'No.025069',
                money: '+10'
            },
            {
                date: "2013.10.20",
                time: "08:03:43",
                type: "支付宝",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "东莞卡",
                cardId: 'No.025003',
                money: '-200'
            },
            {
                date: "2013.10.20",
                time: "10:05:40",
                type: "微信",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "羊城通",
                cardId: 'No.025019',
                money: '+120'
            },
            {
                date: "2013.10.20",
                time: "10:16:22",
                type: "支付宝",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "深圳通",
                cardId: 'No.025001',
                money: '+100'
            },
            {
                date: "2013.10.22",
                time: "08:43:33",
                type: "现金",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "东莞卡",
                cardId: 'No.025106',
                money: '-100'
            },
            {
                date: "2013.10.23",
                time: "08:05:13",
                type: "微信",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "东莞卡",
                cardId: 'No.025109',
                money: '-50'
            },
            {
                date: "2013.10.24",
                time: "08:16:25",
                type: "微信",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "深圳通",
                cardId: 'No.025146',
                money: '+50'
            },
            {
                date: "2013.10.25",
                time: "08:24:06",
                type: "微信",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "羊城通",
                cardId: 'No.025137',
                money: '-50'
            },
            {
                date: "2013.10.28",
                time: "08:35:43",
                type: "支付宝",
                img: 'assets/park-card/thumbnail-totoro.jpeg',
                cardType: "东莞卡",
                cardId: 'No.025180',
                money: '-30'
            },
        ];

        let checkCharge = {
            "retCode": "0000",
            "retMsg": {
                "id": "01",
                "statu": "1",
                "cardNo": "123456789",
                "sum": "50"
            }
        };

        let verifyPhone = {
            "retCode": "0000",
            "verifyCode": "1234"
        };

        let verifyEmail = {
            "retCode": "0000",
            "verifyCode": "1234"
        };

        let user = [{
            id: 1,
            "phone": "18812345678",
            "email": "123@163.com",
            "pwd": "123456",
            "payPwd": "456789",
            // "userStatus":false,暂时只在前台保存
            "roles": "0"
        }];

        let news = [
            {
                id: 1,
                title: "这是一个悲" +
                "伤的故事",
                content: "There are so many stories that can not talk!"
            }, {
                id: 2,
                title: "悲伤逆流成河",
                content: "It is raining all day!"
            }, {
                id: 3,
                title: "美国总统大选",
                content: "本届(2016年)美国总统大选是最热闹的一年,总统候选人希拉里和特朗普之间的互揭家底."
            }, {
                id: 4,
                title: "三星Note7爆炸事件",
                content: "自三星发布Note7以来,在全球范围内已发生多起手机自燃事件,这项事故给三星公司带来了无法挽回的损失!"
            }
            , {
                id: 5,
                title: "宝强离婚案开庭审理",
                content: "宝强离婚案已于10月18日在北京市朝阳区法院正式开庭审理,对于最终结果,我们会继续关注!"
            }
            , {
                id: 6,
                title: "神舟十一号升天",
                content: "神舟十一号和天宫二号成功对接"
            }
            , {
                id: 7,
                title: "锤子发布会",
                content: "锤子发布会结束后,老罗很憔悴,但意外火了讯飞"
            }
            , {
                id: 8,
                title: "国家队主教人选待定",
                content: "自高洪波离职国家队主教练后,国家队正在选定包括里皮,斯科拉里,萨曼诺等在内的名帅."
            }, {
                id: 9,
                title: "欧洲五大联赛是全球水平最高的赛事",
                content: "皇马,巴萨,拜仁,尤文是本国联赛最大的豪门,拥有世界最顶尖的球员."
            }, {
                id: 10,
                title: "NBA是全球水准最高的篮球赛事",
                content: "NBA球队拥有者世界上高水准的运动员."
            }, {
                id: 11,
                title: "足球",
                content: "足球是世界上最大的,关注度最高的体育赛事!"
            }, {
                id: 12,
                title: "篮球",
                content: "篮球是普及度最广,成本最低廉的运动项目."
            }, {
                id: 13,
                title: "乒乓球",
                content: "乒乓球作为中国国球,在国内有着很高的关注度和普及度."
            }, {
                id: 14,
                title: "羽毛球",
                content: "在国内,众多羽毛球爱好者对羽毛球的热情是十分高涨的."
            }, {
                id: 15,
                title: "橄榄球",
                content: "橄榄球在美国和英国有着很高的影响力,这是一项非常刺激又考验运动员的身体素质的体育运动."
            }
        ];

        let about = {
            imgSrc: 'assets/about/ad1.jpg',
            dataList: [
                {title: "联系电话", content: "12345678974"},
                {title: "联系地址", content: "福田区车公庙泰然工业园"},
                {title: "联系邮箱", content: "1254285412@qq.com"}
            ]
        };

        let protocol = [
            {
                id: 1,
                title: "客户隐私保护条款",
                content: "客户隐私保护条App机密政策款客户隐私保护条款"
            }, {
                id: 2,
                title: "App机密政策",
                content: "App机密政策客户隐私保护条款App机密政策"
            }, {
                id: 3,
                title: "用户保密协议",
                content: "用户保密协议App机密政策用户保密协议"
            }, {
                id: 4,
                title: "免责声明4",
                content: ""
            }, {
                id: 5,
                title: "保密协议5",
                content: ""
            }, {
                id: 6,
                title: "保密协议6",
                content: ""
            }, {
                id: 7,
                title: "保密协议7",
                content: ""
            }, {
                id: 8,
                title: "保密协议8",
                content: ""
            }, {
                id: 9,
                title: "保密协议9",
                content: ""
            }, {
                id: 10,
                title: "保密协议10",
                content: ""
            }, {
                id: 11,
                title: "保密协议11",
                content: ""
            }, {
                id: 12,
                title: "保密协议12",
                content: ""
            }, {
                id: 13,
                title: "保密协议13",
                content: ""
            }, {
                id: 14,
                title: "保密协议14",
                content: ""
            }
        ];

        let feedback = {
            fd: "1234"
        };

        const version = [{
            ver: "1.2.3"
        }];
        let account = [
                {
                    id: 1,
                    "retCode": "0000",
                    "accountStatus": 0, //0电子账户存在，且已签约银行卡；1电子账户存在，为签约银行卡；2，电子账户不存在
                    "phone": '15538019676',
                    "account": '123456',
                    "bindCard": "6226622204819777"
                }
            ]
            ;
        let phone = [
            {
                "retCode": "0000",
                "phoneCode": "1234"
            }
        ];
        let eleBind = [
            {"retCode": "0000"}
        ];
        let accountDetail = [
            {
                "retCode": "0000",
                "accountStatus": 0,
            }
        ];
        let payBank = [
            {
                id: 1,
                "retCode": "0000",
                "retMsg": '支付成功！'
            }
        ];

        return {
            accountDetail,
            eleBind,
            phone,
            account,
            ad,
            parkCards,
            rechargeLists,
            consumeLists,
            checkCharge,
            verifyPhone,
            verifyEmail,
            user,
            news,
            about,
            protocol,
            feedback,
            version,
            payBank
        };
    }
}

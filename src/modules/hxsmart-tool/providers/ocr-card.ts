/**
 * Created by Jimmy Luo  on 2016/12/13.
 */
import {Injectable} from '@angular/core';
import {OcrCardRequestService} from "./ocr-card-request";

@Injectable()
export class OcrCardService {

    constructor(private ocrCardRequest: OcrCardRequestService) {
    }

    /**
     * 驾驶证识别
     * @param base64 不带base64标识"data:image/jpg;base64,"
     * @returns {Promise<any>}
     */
    /*正常返回示例
     {
     "outputs": [
     {
     "outputLabel": "ocr_driver_license",
     "outputMulti": {},
     "outputValue": {
     "dataType": 50,
     "dataValue": "{\"config_str\": \"null\n\",\"name\": \"张三三\",\"num\": \"360502xxxx03071357\",\"vehicle_type\":\"C1\", \"start_date\": \"2010xxxx\", \"end_date\": \"6\", \"success\": true  }"
     }
     }
     ]
     }
     失败返回，无数据
     */
    public ocrDriverLicense(base64): Promise<any> {
        let param = {
            "inputs": [
                {
                    "image": {
                        "dataType": 50,
                        "dataValue": base64
                    }
                }
            ]
        };
        return this.ocrCardRequest.httpPost(this.ocrCardRequest.ocrDriverLicenseUrl, param);
    }

    /**
     * 行驶证识别
     * @param base64 不带base64标识"data:image/jpg;base64,"
     * @returns {Promise<any>}
     */
    /*正常返回示例
     {
     "outputs": [
     {
     "outputLabel": "ocr_vehicle_license",
     "outputMulti": {},
     "outputValue": {
     "dataType": 50,
     "dataValue": "{
     \"config_str\": \"null\n\",         #配置字符串信息
     \"owner\": \"张三\",                #所有人名称
     \"plate_num\": \"沪A0M084\",        #车牌号码
     \"vehicle_type\":\"小型轿车\",       #车辆类型
     \"vin\" : \"LSVFF66R8C2116280\",      #车辆识别代号
     \"engine_num\" : \"416098\",        #发动机号码
     \"register_date\": \"20121127\",    #注册日期
     \"request_id\": \"84701974fb983158_20160526100112\",               #请求对应的唯一表示
     \"success\": true                 #识别成功与否 true/false
     }"
     }
     }]
     }
     失败返回示例
     无数据*/
    public ocrVehicle(base64): Promise<any> {
        let param = {
            "inputs": [
                {
                    "image": {
                        "dataType": 50,
                        "dataValue": base64
                    }
                }
            ]
        };
        return this.ocrCardRequest.httpPost(this.ocrCardRequest.ocrVehicleUrl, param);
    }

    /**
     * 身份证识别
     * @param base64 不带base64标识"data:image/jpg;base64,"
     * @param faceOrBack 身份证正面/反面，face: 正面；back: 反面
     * @returns {Promise<any>}
     */
    /*正常返回示例
     {
     "outputs": [
     {
     "outputLabel": "ocr_id",
     "outputMulti": {},
     "outputValue": {
     "dataType": 50,
     "dataValue": "{\"address\": \"浙江省杭州市余杭区文一西路969号\", \"config_str\" : \"{\"side\":\"face\"}\", \"name\" : \"张三\",\"num\" : \"1234567890\", \"success\" : true}"
     }
     }
     ]
     }
     失败返回示例
     无数据*/
    public ocrIdCard(base64, faceOrBack): Promise<any> {
        let param = {
            "inputs": [
                {
                    "image": {
                        "dataType": 50,
                        "dataValue": base64
                    },
                    "configure": {
                        "dataType": 50,
                        "dataValue": "{side: " + faceOrBack + "}"
                    }
                }
            ]
        };
        return this.ocrCardRequest.httpPost(this.ocrCardRequest.ocrIdCardUrl, param);
    }

    /**
     * 营业执照识别
     * @param base64  不带base64标识"data:image/jpg;base64,"
     * @returns {Promise<any>}
     */
    /*正常返回示例
     {
     "outputs": [
     {
     "outputLabel": "ocr_vehicle_license",
     "outputMulti": {},
     "outputValue": {
     "dataType": 50,
     "dataValue": "{
     \"config_str\": \"null\n\",         #配置字符串信息
     \"owner\": \"张三\",                #所有人名称
     \"plate_num\": \"沪A0M084\",        #车牌号码
     \"vehicle_type\":\"小型轿车\",       #车辆类型
     \"vin\" : \"LSVFF66R8C2116280\",      #车辆识别代号
     \"engine_num\" : \"416098\",        #发动机号码
     \"register_date\": \"20121127\",    #注册日期
     \"request_id\": \"84701974fb983158_20160526100112\",               #请求对应的唯一表示
     \"success\": true                 #识别成功与否 true/false
     }"
     }
     }]
     }
     失败返回示例
     无数据
     */
    public ocrBusinessLicense(base64): Promise<any> {
        let param = {
            "inputs": [
                {
                    "image": {
                        "dataType": 50,
                        "dataValue": base64
                    }
                }
            ]
        };
        return this.ocrCardRequest.httpPost(this.ocrCardRequest.ocrBusinessLicenseUrl, param);
    }
}

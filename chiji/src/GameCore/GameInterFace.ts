interface GameMediator{
    /**接受消息 */
    accpetReq(ReqName:string,args?:Array<any>):void;
}
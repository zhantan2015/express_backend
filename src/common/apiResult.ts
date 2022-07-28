export class ApiRuselt {
    code!: number;
    data?: any;
    message!: string;
    type?: string;

    success(message: string) {
        this.code = StatusCode.success
        this.type = 'success'
        this.message = message
        return this
    }
    failed(message: string) {
        this.code = StatusCode.failed
        this.type = 'failed'
        this.message = message
        return this
    }
    setData(data: any) {
        this.data = data
        return this
    }
}

export const enum StatusCode {
    failed = -1,
    success = 1
}

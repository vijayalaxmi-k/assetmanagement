//user management
export interface UserManagement{
    first_name:string;
    last_name : string;
    email : string;
    contact:number;
    password:string;
    active:number;
}
//usermanagement maping table 
export interface UserManagementMap{
    group_id:number;
    branch_id :number;
    product_id:number
}

export interface usergroup {
    group_id:number;
    group_flag:boolean;
    group_name:string;
    status:boolean;
    created_on:Date;
    updated_on:Date;
}
export interface product {
    product_id:number;
    product_name:string;
    status:boolean;
    created_on:Date;
    updated_on:Date;
}
export interface branch {
    branch_id:number;
    branch_name:string;
    status:boolean;
    created_on:Date;
    updated_on:Date;
}
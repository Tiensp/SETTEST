import http from "../apis/http-common";
import { UserModel } from "../../shared/models/user.model";

const getAll = () => http.get("/user");

const get = (id: any) => http.get<UserModel>(`/user/${id}`);

const create = (data: UserModel) => http.post<UserModel>("/user", data);

const update = (id: any, data: UserModel) => http.put<any>(`/user/${id}`, data);

const remove = (id: any) => http.delete<any>(`/user/${id}`);

const removeAll = () => http.delete<any>(`/user`);

const findByName = (name: string) => http.get<Array<UserModel>>(`/user?name=${name}`);

const userService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};

export default userService;

import http from "../apis/http-common";
import { UserModel } from "../../shared/models/user.model";

const getAll = () => {
  return http.get("/user");
};

const get = (id: any) => {
  return http.get<UserModel>(`/user/${id}`);
};

const create = (data: UserModel) => {
  return http.post<UserModel>("/user", data);
};

const update = (id: any, data: UserModel) => {
  return http.put<any>(`/user/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/user/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/user`);
};

const findByName = (name: string) => {
  return http.get<Array<UserModel>>(`/user?name=${name}`);
};

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

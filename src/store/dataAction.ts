import category from "@/model/cateEleme";
import dataItem from "@/model/dataItem";

class DataAction {
  dataKey!: string;
  dataList!: dataItem[];

  constructor(dataKey: string = "stickyNotes") {
    this.dataKey = dataKey;
    this.dataList = this.readData();
  }

  //   获取数据
  readData(): any[] {
    let localData: string | null = window.localStorage.getItem(this.dataKey);
    let arrData: any[] = [];
    if (localData !== null) {
      arrData = JSON.parse(localData);
    }
    return arrData;
  }

  //   获取分类名称
  getCategoryName(cateId: category): string {
    let arr = ["工作", "生活", "学习"];
    return arr[cateId];
  }

  //   获取分类下的所有数据
  getCategoryData(cateId: category): object[] {
    let arr = this.readData();
    let filterArr = arr.filter(item => item.categoryId === cateId);
    return filterArr;
  }

  //   添加数据, 返回id
  addData(newItem: dataItem): number {
    if (this.dataList === null) {
      this.dataList = [newItem];
    }
    let newId =
      this.dataList.length === 0
        ? 1
        : this.dataList[this.dataList.length - 1].id + 1;
    newItem.id = newId;
    this.dataList.push(newItem);
    this.saveLocalData(this.dataList);
    return newId;
  }

  //   保存数据到localStorage里面
  saveLocalData(arrData: dataItem[]): void {
    let jsonData = JSON.stringify(arrData);
    window.localStorage.setItem(this.dataKey, jsonData);
  }

  //   修改数据
  editItem(item: dataItem): void {
    //   通过item.id匹配this.dataList中的id的数据
    let itemData: dataItem | undefined = this.dataList.find(
      ele => ele.id === item.id
    );
    if (itemData) {
      itemData.categoryId = item.categoryId;
      itemData.title = item.title;
      itemData.content = item.content;
      itemData.bgColor = item.bgColor;
      this.saveLocalData(this.dataList);
    }
  }

  //   删除数据
  removeItem(id: string | number): boolean {
    let index = this.dataList.findIndex(item => item.id === id);
    if (index > -1) {
      this.dataList.splice(index, 1);
      this.saveLocalData(this.dataList);
      return true;
    }
    return false;
  }
}
export default DataAction;

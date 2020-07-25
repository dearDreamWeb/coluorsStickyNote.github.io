import category from "./cateEleme";
class DataItem {
  id!: number;
  categoryId!: number;
  title!: string;
  content!: string;
  createTime!: string;
  bgColor!: string;
  constructor(
    id: number = -1,
    categoryId: category = -1,
    title: string = "",
    content: string = "",
    bgColor: string = "",
    createTime: number = -1
  ) {
    this.id = id;
    this.categoryId = categoryId;
    this.title = title;
    this.content = content;
    this.createTime = this.dateFormat(createTime);
    this.bgColor = bgColor;
  }

  dateFormat(time: number): string {
    let date = new Date();
    // 年月日
    const dateLeft = date.toLocaleDateString().replace(/\//g, "-");
    // 时分
    const dateRight = `${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    return `${dateLeft} ${dateRight}`;
  }
}

export default DataItem;

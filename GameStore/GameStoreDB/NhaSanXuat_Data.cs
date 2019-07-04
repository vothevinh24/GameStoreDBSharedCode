using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public static class NhaSanXuat_Data
    {
        public static  NhaSanXuat_Info LayNhaSanXuatTheoMaNhaSanXuat(string maNhaSanXuat)
        {
            NhaSanXuat_Info item = new NhaSanXuat_Info();
            DBHelp db = new DBHelp();
            db.SetCommandText("select * from nhasanxuat where maNhaSanXuat = @maNhaSanXuat", System.Data.CommandType.Text);
            db.AddParameter("@maNhaSanXuat", maNhaSanXuat);
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            item.MaNhaSanXuat = Guid.Parse(t.Rows[0]["maNhaSanXuat"].ToString());
            item.TenNhaSanXuat = t.Rows[0]["tenNhaSanXuat"].ToString();
            return item;
        }
    }
}

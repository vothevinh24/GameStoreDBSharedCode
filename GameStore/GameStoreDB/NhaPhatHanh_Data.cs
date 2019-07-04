using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public static class NhaPhatHanh_Data
    {
        public static  NhaPhatHanh_Info LayNhaPhatHanhTheoMaNhaPhatHanh(string maNhaPhatHanh)
        {
            NhaPhatHanh_Info item = new NhaPhatHanh_Info();
            DBHelp db = new DBHelp();
            db.SetCommandText("select * from nhaphathanh where manhaphathanh = @manhaphathanh",System.Data.CommandType.Text);
            db.AddParameter("@manhaphathanh", maNhaPhatHanh);
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            item.MaNhaPhatHanh = Guid.Parse(t.Rows[0]["manhaphathanh"].ToString());
            item.TenNhaPhatHanh = t.Rows[0]["tennhaphathanh"].ToString();
            return item;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Mvc;

namespace GameStore.Controllers
{
    public class TinTucController : Controller
    {
        // GET: TinTuc
        public ActionResult Index(int trang = 1, string tuKhoa = "", string ma = "", string ten="")
        {
            int soTinTuc = 3;
           
            ViewBag.SoTinTuc = soTinTuc;
            ViewBag.TenDanhMuc = ten;
            List<GameStoreDB.TinTuc_Info> tinTuc = GameStoreDB.TinTuc_Data.DanhSachTinTuc(trang, tuKhoa, ma, soTinTuc);
            ViewBag.TongSoTinTuc = GameStoreDB.TinTuc_Data.TongSoTinTuc(tuKhoa, ma);
            ViewBag.Ma = ma;
            return View(tinTuc);
        }
        public ActionResult TinTucChiTiet(string maTinTuc)
        {
            
            GameStoreDB.TinTuc_Info ChiTietTinTuc = GameStoreDB.TinTuc_Data.LayTinTucChiTiet(maTinTuc);
            return View(ChiTietTinTuc);
        }
        [HttpPost]
        public ActionResult XuLy ( FormCollection f)
        {
            return RedirectToAction("Index", "TinTuc", new { tuKhoa = f["tukhoa"].ToString(), ma = f["ma"].ToString(), ten = f["ten"].ToString() });
        }
        [HttpPost]
        public ActionResult XuLyGameChiTiet(FormCollection f)
        {
            return RedirectToAction("GameChiTiet", "Game", new { tuKhoa = f["tukhoa"].ToString(), ma = f["ma"].ToString(), ten = f["tendanhmucgame"].ToString() });
        }
    }
}
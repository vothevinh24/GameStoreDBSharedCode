using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GameStore.Controllers
{
    public class GameController : Controller
    {
        // GET: Game
        public ActionResult Index(int trang = 1, string tuKhoa = "", string ma = "", string ten = "")
        {
            int soGame = 3;
            ViewBag.SoGame = soGame;
            ViewBag.TenDanhMucTheLoai = ten;
            List<GameStoreDB.Game_Info> Game = GameStoreDB.Game_Data.DanhSachGameTuyChon(trang, tuKhoa, ma, soGame);
            ViewBag.TongSoGame = GameStoreDB.Game_Data.TongSoGameTuyChon(tuKhoa, ma);
            ViewBag.MaTuyChon = ma;
            return View(Game);

        }
        public ActionResult GameChiTiet(int trang = 1, string tuKhoa = "", string ma = "", string ten = "")
        {
            int soGame = 3;
            ViewBag.SoGame = soGame;
            ViewBag.TenDanhMucGame = ten;
            GameStoreDB.Game_Info ChiTietGame = GameStoreDB.Game_Data.LayGameChiTiet(ma);
            List<GameStoreDB.TinTuc_Info> TinTucTheoGame = GameStoreDB.TinTuc_Data.DanhSachTinTuc(trang, tuKhoa, ma, soGame);
            ViewBag.TongSoGame = GameStoreDB.TinTuc_Data.TongSoTinTuc(tuKhoa, ma);
            ViewBag.MaTuyChon = ma;
            ViewBag.ChiTietGame = ChiTietGame;
            ViewBag.TinTucTheoGame = TinTucTheoGame;
            return View(TinTucTheoGame);
        }

        [HttpPost]
        public ActionResult XuLyGame(FormCollection f)
        {
            
            return RedirectToAction("Index", "Game", new { tuKhoa = f["tukhoa"].ToString(), ma = f["ma"].ToString(), ten = f["ten"].ToString() });
        }





    }
}
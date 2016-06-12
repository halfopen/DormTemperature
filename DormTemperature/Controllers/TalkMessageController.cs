using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DormTemperature.Models;

namespace DormTemperature.Controllers
{
    public class TalkMessageController : Controller
    {
        private TalkMessageDbContext db = new TalkMessageDbContext();

        //
        // GET: /TalkMessage/

        public ActionResult Index()
        {
            ViewBag.Message = "评论管理";
            if(User.Identity.IsAuthenticated)
                return View(db.Messages.ToList());
            else
                return Redirect("../Account/Login");
        }

        //
        // GET: /TalkMessage/Details/5

        public ActionResult Details(int id = 0)
        {
            TalkMessage talkmessage = db.Messages.Find(id);
            if (talkmessage == null)
            {
                return HttpNotFound();
            }
            return View(talkmessage);
        }

        //
        // GET: /TalkMessage/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /TalkMessage/Create

        [HttpPost]
        public ActionResult Create(TalkMessage talkmessage)
        {
            if (ModelState.IsValid)
            {
                db.Messages.Add(talkmessage);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(talkmessage);
        }

        //
        // GET: /TalkMessage/Edit/5

        public ActionResult Edit(int id = 0)
        {
            TalkMessage talkmessage = db.Messages.Find(id);
            if (talkmessage == null)
            {
                return HttpNotFound();
            }
            return View(talkmessage);
        }

        //
        // POST: /TalkMessage/Edit/5

        [HttpPost]
        public ActionResult Edit(TalkMessage talkmessage)
        {
            if (ModelState.IsValid)
            {
                db.Entry(talkmessage).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(talkmessage);
        }

        //
        // GET: /TalkMessage/Delete/5

        public ActionResult Delete(int id = 0)
        {
            TalkMessage talkmessage = db.Messages.Find(id);
            if (talkmessage == null)
            {
                return HttpNotFound();
            }
            return View(talkmessage);
        }

        //
        // POST: /TalkMessage/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            TalkMessage talkmessage = db.Messages.Find(id);
            db.Messages.Remove(talkmessage);
            db.SaveChanges();
            
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }


        public ActionResult ShowTalkMessages()
        {
            ViewBag.Message = "室友讨论";
            return View(db.Messages.ToList().OrderByDescending(i=>i.timestamp));
        }
    }
}
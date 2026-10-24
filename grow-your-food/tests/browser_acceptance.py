#!/usr/bin/env python3
"""Standalone GrowMeal browser acceptance. Run from repo root.
Requires: pip install playwright; playwright install chromium
Starts a local HTTP server; does not touch Claude's app or production services.
"""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from functools import partial
from playwright.sync_api import sync_playwright
import json, sys

ROOT=Path(__file__).resolve().parents[2]
REPORT=Path(__file__).with_name("browser-results.json")
results=[]
def check(label, action):
    try:
        action()
        results.append({"name":label,"status":"PASS"})
        print("PASS",label)
    except Exception as exc:
        results.append({"name":label,"status":"FAIL","error":str(exc)})
        print("FAIL",label,exc)

def run():
    server=ThreadingHTTPServer(("127.0.0.1",0),partial(SimpleHTTPRequestHandler,directory=str(ROOT)))
    Thread(target=server.serve_forever,daemon=True).start()
    base=f"http://127.0.0.1:{server.server_port}/grow-your-food/components/"
    try:
        with sync_playwright() as p:
            browser=p.chromium.launch(headless=True)
            for width,height in [(320,700),(375,812),(390,844),(768,1024),(1024,768)]:
                page=browser.new_page(viewport={"width":width,"height":height})
                errors=[]
                page.on("pageerror",lambda e:errors.append(str(e)))
                def mobile():
                    page.goto(base+"mobile.html")
                    page.get_by_role("heading",name="Small space. Real food.").wait_for()
                    page.locator("#phaseStrip .phase-tile").first.wait_for()
                    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth+2"),"Horizontal overflow"
                    assert not errors,errors
                check(f"mobile layout {width}x{height}",mobile)
                page.close()
            page=browser.new_page(viewport={"width":390,"height":844})
            page_errors=[]
            page.on("pageerror",lambda e:page_errors.append(str(e)))
            def flow():
                page.goto(base+"journey.html#start")
                page.get_by_role("heading",name="Plant a crop").wait_for()
                page.locator("#plant select[name=crop]").select_option("amaranth")
                page.locator("#plant input[name=date]").fill("2026-10-24")
                page.get_by_role("button",name="Create my garden").click()
                assert page.get_by_text("Garden added to this browser.").count()==1
                page.get_by_role("button",name="Growing calendar").click()
                page.get_by_text("2026-11-28",exact=False).first.wait_for()
                page.get_by_role("button",name="Garden journal").click()
                page.locator("#journalform textarea").fill("Leaves healthy")
                page.get_by_role("button",name="Save observation").click()
                page.get_by_text("Leaves healthy").wait_for()
                page.get_by_role("button",name="Harvest records").click()
                page.locator("#harvestform input[name=quantity]").fill("2")
                page.locator("#harvestform select[name=unit]").select_option("kg")
                page.get_by_role("button",name="Record harvest").click()
                assert page.get_by_text("2 kg",exact=False).count()>=1
                page.reload()
                page.get_by_text("2 kg",exact=False).first.wait_for()
                assert not page_errors,page_errors
            check("complete growing journey and persistence",flow)
            def deep_link():
                page.goto(base+"mobile.html")
                page.locator(".bottom-nav a[href$='#calendar']").click()
                page.get_by_role("heading",name="Growing calendar").wait_for()
            check("mobile deep-link navigation",deep_link)
            def export():
                with page.expect_download() as d:
                    page.get_by_role("button",name="Export my records (JSON)").click()
                assert d.value.suggested_filename.endswith(".json")
            check("JSON export",export)
            def clear():
                page.once("dialog",lambda dialog:dialog.accept())
                page.get_by_role("button",name="Clear this browser's records").click()
                page.get_by_role("button",name="Harvest records").click()
                page.get_by_text("No harvests recorded.").wait_for()
            check("clear local records",clear)
            browser.close()
    finally:
        server.shutdown()
        REPORT.write_text(json.dumps({"results":results,"passed":sum(x["status"]=="PASS" for x in results),"failed":sum(x["status"]=="FAIL" for x in results)},indent=2))
    return 1 if any(x["status"]=="FAIL" for x in results) else 0

if __name__=="__main__":
    sys.exit(run())

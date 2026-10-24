import test from 'node:test';import assert from 'node:assert/strict';import {datePlus,buildCalendar,harvestEstimate} from '../planting-calendars/calendar.mjs';import {makeHarvest,harvestTotals} from '../harvest-tracking/harvest.mjs';import {appendJournal} from '../garden-journals/journal.mjs';
test('date arithmetic handles leap year',()=>assert.equal(datePlus('2028-02-28',2),'2028-03-01'));
test('calendar tasks and harvest range',()=>{const guide={tasks:[{offset:0,title:'Sow'},{offset:10,title:'Check'}],firstHarvest:[28,45]};assert.equal(buildCalendar(guide,'2026-10-24')[1].date,'2026-11-03');assert.equal(harvestEstimate(guide,'2026-10-24').earliest,'2026-11-21')});
test('invalid date rejected',()=>assert.throws(()=>datePlus('2026-02-30',1)));
test('harvest units remain distinct',()=>{const a=makeHarvest({gardenId:'g1',cropId:'okra',date:'2026-10-24',quantity:2,unit:'kg'});const b=makeHarvest({gardenId:'g1',cropId:'okra',date:'2026-10-24',quantity:3,unit:'count'});assert.deepEqual(harvestTotals([a,b]),{'okra|kg':2,'okra|count':3})});
test('negative harvest rejected',()=>assert.throws(()=>makeHarvest({gardenId:'g',cropId:'okra',date:'2026-10-24',quantity:-1,unit:'kg'})));
test('journal events sort chronologically',()=>assert.equal(appendJournal([{date:'2026-10-25'}],{date:'2026-10-24'})[0].date,'2026-10-24'));

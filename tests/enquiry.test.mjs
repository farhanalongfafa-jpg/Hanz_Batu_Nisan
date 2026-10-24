import test from 'node:test';
import assert from 'node:assert/strict';
import {isValidPhone,whatsappUrl} from '../lib/enquiry.ts';
import {copy,contactNumber,pictures} from '../lib/content.ts';
import {existsSync} from 'node:fs';
test('phone validation rejects missing, malformed and oversized values',()=>{
 for(const v of ['', 'abc12345', '123', '+6012345678901234','6012<script>'])assert.equal(isValidPhone(v),false,v);
 for(const v of ['+60 11-7017 1942','01170171942','(011) 70171942'])assert.equal(isValidPhone(v),true,v);
});
test('WhatsApp message preserves Unicode, ampersands and line breaks',()=>{
 const message='Nama: Contoh & keluarga\nTulisan: ڤرينتيان\nNotes: ? + #';
 const u=new URL(whatsappUrl(contactNumber,message));
 assert.equal(u.pathname,'/601170171942');assert.equal(u.searchParams.get('text'),message);assert.equal([...u.searchParams].length,1);
 assert.throws(()=>whatsappUrl('not-a-number',message));
});
test('both languages cover all copy and option positions',()=>{
 assert.deepEqual(Object.keys(copy.ms).sort(),Object.keys(copy.en).sort());
 for(const key of Object.keys(copy.ms)) {assert.ok(copy.ms[key]);assert.ok(copy.en[key]);if(Array.isArray(copy.ms[key]))assert.equal(copy.ms[key].length,copy.en[key].length,key)}
});
test('all model photographs exist',()=>{for(const p of pictures)assert.ok(existsSync(new URL('../public/images/'+p,import.meta.url)),p)});

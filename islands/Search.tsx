/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";



import Layout from '../components/Layout.tsx'

const IndexPage = () => {
  const [searchResultMessage, setSearchResultMessage] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const searchResponse = async (query: string, db = '') => {
    setSearchResultMessage("جار البحث ..")
    return await (await fetch(`https://moncefplastin07-hss.deno.dev/?q=${query}&dbs=${db}`)).json()
  }
  const searchHandle = async () => {
    const query = (document.getElementById("q") as HTMLInputElement).value 
    const db = (document.querySelector('input[name="db"]:checked') as HTMLInputElement).value
    if (query.length > 2) {
      
      const searchResult = await searchResponse(query, db)  
     
      if (searchResult.length < 1) {
        setSearchResultMessage("لا توجد نتائج بحث مطابقة")

      } else {
        setSearchResultMessage(`توجد ${searchResult.length} نتيجة بحث متطابقة`)

      }
      setSearchResult(searchResult)
      
    }else{
      setSearchResultMessage('')
    }
    
  }
  return (
    <Layout title="الفهرس المتاح على الخط - علوم انسانية واجتماعية - شتمة بسكرة">
      <br/><br/>
      <h2 className={tw`text-xl mt-10`}>فهرس على الخط خاص بمحتوى مكتبة كلية العلوم الانسانية والاجتماعية بسكرة </h2>
      <h3 className={tw`text-lg mt-5 mb-10`}>من طرف الطالب <strong>منصف قحة</strong>(ماستر علم مكتبات)</h3>
      <div className={tw`text-sm bg-green-100 py-4 px-5 rounded-md md:text-lg m-auto md:w-4/6`}>يجب ان تكون عبارة البحث اكثر من حرفين ليبدئ البحث, يقوم هاذا الفهرس بالبحث في حقلي العنوان واسم الكاتب اظافة الى رقم التصنيف</div><br/><br/>
      <input type="text" id="q" placeholder="ادخل عبارة البحث ثم اضغط Enter" className={tw`px-4 py-3 text-right md:w-3/6 w-full border border-gray-200 `} onInput={searchHandle}/>
      <p className={tw`pt-3 pb-5`}>{ searchResultMessage }</p>
      <div className={tw`grid md:grid-cols-3 grid-cols-2 gap-11 w-3/6 w-full m-auto `}>
      <span>
          <label htmlFor="li">علم مكتبات</label>
          <input type="radio" name="db" value="li" id='li' onChange={searchHandle} />
        </span>
        <span>
          <label htmlFor="hs">تاريخ</label>
          <input type="radio" name="db" value="hs" id='hs' onChange={searchHandle} />
        </span>
        <span>
          <label htmlFor="co">اتصال</label>
          <input type="radio" name="db" value="co" id='co' onChange={searchHandle} />
        </span>
        <span>
          <label htmlFor="th">ثقافة عامة</label>
          <input type="radio" name="db" value="th" id='th' onChange={searchHandle} />
        </span>
        <span>
          <label htmlFor="so">علم الاجتماع</label>
          <input type="radio" name="db" value="so" id='so' onChange={searchHandle}/>
        </span>
        <span>
          <label htmlFor="pc">علم النفس</label>
          <input type="radio" name="db" value="pc" id="pc" onChange={searchHandle}/>
        </span>
        <span>
          <label htmlFor="fl">لغات اجنبية (فرنسية فقط)</label>
          <input type="radio" name="db" value="fl" id='fl' onChange={searchHandle}/>
        </span>
      </div>
     { searchResult.length > 0 ?  <div className={tw`xl:p-10 text-right`}>
        <table dir="rtl" className={tw`m-auto `}>
          <thead>
            <tr className={tw`font-mono`}>
              <th className={tw`px-2 py-1.5`}>المعرف</th>
              <th className={tw`px-2 py-1.5`}>العنوان</th>
              <th className={tw`px-2 py-1.5`}>الكاتب</th>
              <th className={tw`hidden md:inline px-2 py-1.5`}>دار النشر</th>
              <th className={tw`hidden md:inline px-2 py-1.5`}>سنة النشر</th>
              <th className={tw`hidden md:inline px-2 py-1.5`}>الدولة</th>
            </tr>
          </thead>
          <tbody>
            {
              searchResult.map((book:any, index)=>{
                return <tr className={tw(index % 2 == 0 ? "bg-gray-50" : '')}>
                <td className={tw`px-2 py-1.5 border-r border-gray-100`}>{book.ID}</td>
                <td className={tw`px-2 py-1.5 border-r border-gray-100`}>{book.title}</td>
                <td className={tw`px-2 py-1.5 border-r border-gray-100`}>{book.author}</td>
                <td className={tw`hidden md:inline px-2 py-1.5 border-r border-gray-100`}>{book.publisher}</td>
                <td className={tw`hidden md:inline px-2 py-1.5 border-r border-gray-100`}>{book.publishYear}</td>
                <td className={tw`hidden md:inline px-2 py-1.5 border-r border-gray-100`}>{book.country}</td>
              </tr>
              })
            }
          </tbody>
        </table>
      </div> : ''}
    </Layout>
)}

export default IndexPage

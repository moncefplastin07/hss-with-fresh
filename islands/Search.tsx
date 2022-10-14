/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";



import Layout from '../components/Layout.tsx'

const IndexPage = () => {
  const [searchResultMessage, setSearchResultMessage] = useState('')
  const [keywords, setKeywords] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const searchResponse = async (query: string, db = '') => {
    setSearchResultMessage("جار البحث ..")
    return await (await fetch(`https://moncefplastin07-hss.deno.dev/?q=${query}&dbs=${db}`)).json()
  }
  const searchHandle = async () => {
    const query = (document.getElementById("q") as HTMLInputElement).value 
    const db = (document.querySelector('input[name="db"]:checked') as HTMLInputElement).value
    if (query.length > 2) {
      
      const {keywords, searchResult} = await searchResponse(query, db)  
      setKeywords(keywords)
      console.log()
     
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
      <span className={tw`text-xl`}>مرحبا 👋</span>
      <h2 className={tw`text-xl mt-10`}>فهرس على الخط خاص بمحتوى مكتبة كلية العلوم الانسانية والاجتماعية بسكرة </h2>
      <h3 className={tw`text-lg mt-5 mb-10`}>من طرف الطالب <strong>منصف قحة</strong>(ماستر علم مكتبات)</h3>
      <div className={tw`text-sm bg-green-100 py-4 px-5 rounded-md md:text-lg m-auto md:w-4/6`}>يجب ان تكون عبارة البحث اكثر من حرفين ليبدئ البحث, يقوم هاذا الفهرس بالبحث في حقلي العنوان واسم الكاتب اظافة الى رقم التصنيف</div><br/><br/>
      <input type="text" id="q" placeholder="ادخل عبارة البحث ثم اضغط Enter" className={tw`px-5 py-8 text-right md:w-3/6 w-full border border-gray-200 `} onInput={searchHandle}/>
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
      <div className={tw`m-auto w-full md:w-1/2	`}>
     { searchResult.length > 0 ?  <div className={tw`xl:p-10 text-right`}>
      
        
            {
              searchResult.map((book:any, index)=>{
                return (
                  <div className={tw`p-5 bg-gray-100 my-5 rounded-md`} dir="rtl">
                    <h1 className={tw`text-2xl`}>{book.title}</h1>
                    <h3 className={tw`text-lg`}>{book.subtitle}</h3>
                    <div className={tw`md:flex md:gap-6 my-5`}>
                      <table className={tw`w-full md:w-1/2`}>
                        <tr>
                          <td><b>المؤلف: </b></td><td>{book.author}</td>
                        </tr>
                        <tr>
                          <td><b>الناشر: </b></td><td>{book.publisher}</td>
                        </tr>
                        <tr>
                          <td><b>مكان النشر: </b></td><td>{book.country}</td>
                        </tr>
                        <tr>
                          <td><b>سنة النشر: </b></td><td>{book.publishYear}</td>
                        </tr>
                      </table>
                      <table className={tw`w-full md:w-1/2`}>
                        <tr>
                          <td><b>عدد الصفحات: </b></td><td>{book.pages}</td>
                        </tr>
                        <tr>
                          <td><b>الكلمات المفتاحية: </b></td><td>{book.keywords}</td>
                        </tr>
                        <tr>
                          <td><b>رمز التصنيف: </b></td><td>{book.ID}</td>
                        </tr>
                        
                      </table>
                    </div>
                    <b>المحتوى:</b>
                    <p className={tw`whitespace-pre-line`} dangerouslySetInnerHTML={{__html:book.notecontent?.replace(new RegExp(`(${keywords.join("|")})`, "ig"), "<b style=background:yellow>$1</b>")}}></p>
                    <p className={tw`text-center`}>رمز التصنيف: <b className={tw`text-2xl`}>{book.ID}</b></p>
                  </div>
                )
              })
            }
          
          
      </div> : ''}
      </div>
    </Layout>
)}

export default IndexPage

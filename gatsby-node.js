
const myData = [
    {
    title:"car1",
    img:"https://funnyland.com.ua/upload/iblock/7bb/r47v6cs9gz6mscpoawg6z889soihdkcp.jpg"
},
    {
    title:"car2",
    img:"https://uhl-mash.com.ua/upload/resize_cache/iblock/88b/1920_1080_1/vilochniy_pogruzchik_25.jpg"
},

]
const { createRemoteFileNode } = require("gatsby-source-filesystem")
exports.sourceNodes = async ({ actions, createNodeId, createContentDigest ,getCache }) => {
    const { createNode    } = actions
    const makeField =async (item,i)=>{
        const downloadImg=  await createRemoteFileNode({
            url: item.img,
            createNode,
            createNodeId,
            getCache,
        })
        const nodeMeta = {
            ...item,
            id: createNodeId(`my-data-${item.title+i}`),
            children: [ downloadImg.id  ],
            internal: {
                type: `fieldWithImages`,
                content: JSON.stringify(item),
                contentDigest: createContentDigest(myData)
            }
        }

        await createNode(nodeMeta);
    }
    const promise  = myData.map((item,i)=>makeField(item,i))
    await Promise.all(promise)
}


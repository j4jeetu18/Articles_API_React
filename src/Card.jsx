import { Modal } from 'rsuite';
import React from 'react';
import ModalHeader from 'rsuite/esm/Modal/ModalHeader';
import ModalBody from 'rsuite/esm/Modal/ModalBody';
import ModalFooter from 'rsuite/esm/Modal/ModalFooter';

export default function Card({ title, short_description, reading_time, thumb, slug, setSearchSuggestions,shouldShow }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [contentBody, setContentBody] = React.useState("No desciption")

    React.useEffect(() => {
        fetch(`https://api.theinnerhour.com/v1/blogdetail/${slug}`)
            .then(response => {
                return response.json()
            })
            .then(resInJSON => {
                setContentBody({
                blogContent: resInJSON.blog.body,
                category: resInJSON.blog.category
            })
            setSearchSuggestions(prev=>[...prev,resInJSON.blog.category,title])
        })
    }, [])

    if (contentBody !== "No desciption") {
        return (
            <>
                <span className={`cards ${contentBody.category} ${title}` }  onClick={() => setIsOpen(prev => !prev)} hidden={shouldShow===""?false:true}>
                    <img className="card_image" src={thumb} />
                    <div className='cardContent'>
                        <h4 className='header1'>{title}</h4>
                        <br/>
                        <p className='contentType1'>{short_description}</p>
                        <p className='rightAlignedFooter'>{reading_time}</p>
                    </div>
                </span>
                <Modal open={isOpen} size="md" backdrop={true} onClose={() => setIsOpen(false)}>
                    <ModalHeader closeButton={false}>
                        <p className='heading2'>{title}</p>
                        <img style={{width:"100%",height:"fit-content"}} src={thumb} />
                    </ModalHeader>
                    <ModalBody style={{width:"100%",margin:"3% 0",padding:"4%",maxHeight:"90vh",fontSize:"medium"}}>
                    <div dangerouslySetInnerHTML={{ __html: contentBody.blogContent }} 
                    style={{display:"grid",rowGap:"1.67%"}}></div>
                    </ModalBody>
                    <ModalFooter>
                    <p className='rightAlignedFooter'>{reading_time}</p>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}
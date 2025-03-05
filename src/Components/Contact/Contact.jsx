import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/envelope.png'
import white_arrow from '../../assets/white_arrow.png'
const Contact = () => {
  return (
    <div className='contact'>
        <div className='contact-col'>
            <h2>Contact & Aide</h2>
            <h3>Vous avez des questions ?
            <br/>Envoyez-nous un message <img src={msg_icon} alt="" /></h3>
            <p>Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
             Nous nous engageons à fournir un excellent service client et à répondre à toutes vos questions.</p>
        {/* <ul>
            <li></li>
        </ul> */}
        </div>
        <div className='contact-col'>
            <form>
                <label>Votre Nom & Prenom</label>
                <input type="text" name='' placeholder='' required/>
                <label>Numéro de téléphone</label>
                <input type="text" name='' placeholder='' />
                <label>Votre Email</label>
                <input type="text" name='' placeholder='' required/>
                <label>Ecrire votre message ici</label>
                <textarea name='message' rows="6" placeholder='Entre Votre message' required></textarea>
                <button type='submit' className='btn-contact'>Envoyer <img src={white_arrow} alt="" /></button>
            </form>
        </div>
    </div>

  )
}

export default Contact
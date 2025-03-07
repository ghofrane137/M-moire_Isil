import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/envelope.png'
import white_arrow from '../../assets/white_arrow.png'
const Contact = () => {
    

    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "1b39b2ff-3a2e-4b9d-bf0f-7dd3e2a42c67");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };


  return (

    <div className='contact'>
        <div className='contact-col'>
            <h2>Contact & Aide</h2>
            <h3>Vous avez des questions ?
            <br/>Envoyez-nous un message <img src={msg_icon} alt="" /></h3>
            <p>Remplissez le formulaire ci-contre et nous vous répondrons dans les plus brefs délais.
             Nous nous engageons à fournir un excellent service client et à répondre à toutes vos questions.</p>
      
        </div>
        <div className='contact-col'>
            <form onSubmit={onSubmit}>
                <label>Votre Nom & Prenom</label>
                <input type="text" name='name_prenom' placeholder='Entrez votre nom et prénom' required />
                <label>Numéro de téléphone</label>
                <input type="tel" name='phone' placeholder='Entrez votre numéro de téléphone' />
                <label>Votre Email</label>
                <input type="email" name='email' placeholder='Entrez votre email' required/>
                <label>Ecrire votre message ici</label>
                <textarea name='message' rows="6" placeholder='Entre Votre message' required></textarea>
                <button type='submit' className='btn-contact'>Envoyer <img src={white_arrow} alt="" /></button>

            </form>
            <span>{result}</span>
        </div>
    </div>

  )
}

export default Contact;
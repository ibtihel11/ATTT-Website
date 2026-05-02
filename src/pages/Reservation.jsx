import { useState } from 'react';
import Stepper from '../components/ui/Stepper';
import StepIdentification from '../components/reservation/StepIdentification';
import StepSchedule from '../components/reservation/StepSchedule';
import StepRecap from '../components/reservation/StepRecap';
import StepPayment from '../components/reservation/StepPayment';
import StepSuccess from '../components/reservation/StepSuccess';
import styles from './Reservation.module.css';

export default function Reservation() {
  const [step, setStep] = useState(1);
  const [vehicle, setVehicle] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [payment, setPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <h1>Prise de rendez-vous</h1>
          <p>Réservez votre visite technique en quelques étapes simples</p>
        </div>
      </div>

      {step < 5 && <Stepper currentStep={step} />}

      <div className="container">
        <div className={styles.content}>
          {step === 1 && (
            <StepIdentification
              onNext={(v) => { setVehicle(v); setStep(2); }}
            />
          )}
          {step === 2 && (
            <StepSchedule
              vehicle={vehicle}
              onNext={(s) => { setSchedule(s); setStep(3); }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <StepRecap
              vehicle={vehicle}
              schedule={schedule}
              onNext={(r) => { setReservation(r); setStep(4); }}
              onBack={() => setStep(2)}
              onPaymentMethodChange={setPaymentMethod}
            />
          )}
          {step === 4 && (
            <StepPayment
              reservation={reservation}
              paymentMethod={paymentMethod}
              onNext={(p) => { setPayment(p); setStep(5); }}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && (
            <StepSuccess
              reservation={reservation}
              payment={payment}
              schedule={schedule}
              vehicle={vehicle}
            />
          )}
        </div>
      </div>
    </div>
  );
}

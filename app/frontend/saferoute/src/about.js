import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Container, Typography, Link, Divider, Paper } from '@mui/material';
import { styled } from '@mui/system';
import BGImage from 'images/background.jpg';
import signoutImage from './images/signout.png';
import logo from './images/logo.png';

const StyledContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#3d4d5c',
    color: '#e6e6e6',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginTop: '50px',
    marginBottom: '110px'
  }));

const StyledSubContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#1c2833',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

const StyledDataItem = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(2),
}));

const StyledDivider = styled(Divider)({
  width: '100%',
  height: '2px',
  backgroundColor: '#e6e6e6',
  marginBottom: '10px'
});

const StyledLink = styled(Link)({
  color: '#e6e6e6',
  textDecoration: 'none',
  '&:hover': {
    color: '#90a7d5',
  },
});

const StyledBackground = styled('div')({
    overflow: 'hidden',
    backgroundImage: `url(${BGImage})`,
    backgroundSize: 'cover',
  });
  

const UsedData = ({ signOut, user }) => {
  return (
    <StyledBackground>
      <header>
        <header>
        <nav>
            <ul>
                <li style={{ textAlign: 'left', float: 'left' }}>
                  <a href="/map"><img src={logo} style={{width: '24px', height: '24px'}} /></a>
                </li>
                <li style={{ textAlign: 'left', float: 'left', transform: 'translateX(-20%)' }}>
                  <a href="/map">SAFEROUTE</a>
                </li>
                <li className="navHover" style={{ textAlign: 'right' }}>
                    <a href="/map">Map</a>
                </li>
                <li className="navHover" style={{ textAlign: 'right' }}>
                    <a className="navHover" href="/about">About</a>
                </li>
                <li className="navHover" style={{ textAlign: 'right' }}>
                    <a href="/used_data">Used data</a>
                </li>
                <li className="navHover" style={{ textAlign: 'right' }}>
                    <a href="https://33faoddqwe4bjauetiiaatreye0uirjf.lambda-url.eu-central-1.on.aws/docs" target="_blank">SWAGGER UI</a>
                </li>
                <li className="navHover" style={{ textAlign: 'right' }}><img
                    className="navHover"
                    src={signoutImage}
                    alt="Signout"
                    onClick={signOut} 
                    style={{ textAlign: 'right', cursor: 'pointer', width: '20px', height: '20px', transform: 'translateY(20%)'}}
                    />
                </li>
            </ul>
        </nav>
    </header>
      </header>
      <div>
        <Paper sx={{ height: '100vh', overflow: 'auto', backgroundImage: `url(${BGImage})`, backgroundSize: 'cover'}}>
          <StyledContainer>
            <StyledDataItem>
            <StyledSubContainer>
                <Typography variant="h4" component="h3" color="#e6e6e6">Info</Typography>
                <StyledDivider />
                <Typography variant="body1">
                    Author: Zakala Oleksandr<br />
                    Project name: SafeRoute<br />
                    TG Link: <StyledLink href='https://t.me/rovikido' target="_blank">https://t.me/rovikido</StyledLink><br />
                    Email: oleksandr.zakala@gmail.com<br />
                    GtiHub repo: <StyledLink href='https://github.com/Rovikido/SafeRoute' target="_blank">https://github.com/Rovikido/SafeRoute</StyledLink><br />
                </Typography>
            </StyledSubContainer>
            </StyledDataItem>


            <StyledDataItem>
              <StyledSubContainer>
                <Typography variant="h4" component="h3" color="#e6e6e6">
                  Checklist
                </Typography>
                <StyledDivider />
                <Typography variant="body1">
                1. Swagger UI - в FastAPI ✔️<br />
                2. Авторизація з допомогою Google аккаунту (або Azure AD) - ✔️<br />
                3. Використання Entity Framework (або іншої ORM) - не реляційна БД<br />
                4. Інтеграція з MS SQL або NoSQL базою даних - ✔️<br />
                5. Dependency Injection - ✔️<br />
                6. Використання в проекті відкритого API (наприклад одного з https://github.com/public-apis/public-apis) - geocodio ✔️<br />
                7. Має бути якийсь алгоритм обробки даних (конвертація, маппінг, розрахунок) або використання якогось інструменту з Azure (наприклад Face API)  - ✔️<br />
                8. Використання Azure Monitor (Application Insights або CloudWatch) для зберігання та аналізу логів додатку  - ✔️<br /><br />

                Розгортання та зберігання коду:<br />
                8. Розгортування проекту в Azure/AWS  - ✔️<br />
                9. Весь код повинун бути збережений на Github в публічному репозиторії (з постійними оновленнями)  - ✔️<br />
                10. Налаштувати Continuous Integration/Continuous delivery  - ✔️<br />
                11. В розгорнутому проекті в шапці має бути ім'я та прізвище студента.  - ✔️<br /><br />

                Документація:<br />
                12. Документація на проект (діаграма архітектури, діаграма використаної інфраструктури) - ✔️<br />
                13. Декомпозиція задач проекту (список завдань та підзавдань проекту) - ✔️<br />
                14. В проекті має бути сторінка About з таким переліком інформації:<br />
                Прізвище та Ім'я студента - ✔️<br />
                Назва проекту - ✔️<br />
                Посилання на Телеграм (лінка по якій можна перейти і одразу написати студенту)  - ✔️<br />
                Email студента - ✔️<br />
                Посилання на Github репозиторій де зберігається код проекту - ✔️<br />
                15. В проекті має бути файл Readme з таким переліком інформації:<br />
                Як запустити проект? - ✔️<br />
                Які технології\пакети використовуються і для чого? (Entity Framework, Swashbuckle, MS Test...) - ✔️<br />
                Як ресурси використовує проект ? (Sql Database, Azure App Service...) - ✔️<br />
                Документація на проект (діаграма архітектури, діаграма використаної інфраструктури) - ✔️<br />
                Декомпозиція задач проекту (список завдань та підзавдань проекту) - ✔️<br />
                Прізвище та Ім'я студента - ✔️<br />
                Назва проекту - ✔️<br />
                Посилання на Телеграм (лінка по якій можна перейти і одразу написати студенту) - ✔️<br />
                Email студента - ✔️<br />
                Посилання на задеплоєний проект Azure/AWS - ✔️<br /><br />

                Тестування:<br />
                16. Postman колекції для тестування 5ти сценаріїв - +-✔️(тільки 2)<br />
                17. Unit тести алгоритму обробки даних - ✔️<br /><br />

                Презентація:<br />
                18. Презентація проекту з демо (зробити презентацію, розказати про суть проекту, показати діаграми, декомпозицію задач, обрану інфраструктуру на Azure, показати робочий проект - live demo)
                </Typography>
              </StyledSubContainer>
            </StyledDataItem>
          </StyledContainer>
        </Paper>
      </div>
    </StyledBackground>
  );
};

export default withAuthenticator(UsedData, {
  socialProviders: ['google'],
});

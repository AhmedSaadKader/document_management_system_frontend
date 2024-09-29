import React from 'react';
import { Card, CardContent, CardHeader, Typography, Grid } from '@mui/material';
import {
  Laptop,
  DarkMode,
  Language,
  Cloud,
  PhoneAndroid,
  Code,
  Storage,
  CloudQueue,
  Security,
  CodeOff,
  Tour,
  SvgIconComponent,
  DataObject,
} from '@mui/icons-material';

interface TechIconProps {
  icon: SvgIconComponent; // Type for Material-UI icons
  label: string; // Type for the label
}

const TechIcon: React.FC<TechIconProps> = ({ icon: Icon, label }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px',
    }}
  >
    <Icon style={{ fontSize: 40, marginBottom: '8px' }} />
    <Typography variant='caption' align='center'>
      {label}
    </Typography>
  </div>
);

const WebAppTour = () => {
  return (
    <div style={{ padding: '16px' }}>
      <Card className='tech-overview' style={{ marginTop: '16px' }}>
        <CardHeader title='Web App Technologies Overview' />
        <CardContent>
          <Grid container spacing={2}>
            {/* Frontend Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className='frontend-tech'>
                <CardHeader title='Frontend' />
                <CardContent
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <TechIcon icon={Laptop} label='React' />
                  <TechIcon icon={Code} label='TypeScript' />
                  <TechIcon icon={Laptop} label='Material UI' />
                  <TechIcon icon={CodeOff} label='Codemirror' />
                  <TechIcon icon={Tour} label='React-Joyride' />
                </CardContent>
              </Card>
            </Grid>

            {/* Backend Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className='backend-tech'>
                <CardHeader title='Backend' />
                <CardContent
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <TechIcon icon={CloudQueue} label='Node.js' />
                  <TechIcon icon={Code} label='TypeScript' />
                  <TechIcon icon={Code} label='Jest Testing' />
                  <TechIcon icon={Security} label='bcrypt + JWT' />
                </CardContent>
              </Card>
            </Grid>

            {/* Cloud & Hosting Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className='cloud-tech'>
                <CardHeader title='Cloud & Hosting' />
                <CardContent
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <TechIcon icon={Cloud} label='S3 Storage' />
                  <TechIcon icon={CloudQueue} label='Railway' />
                  <TechIcon icon={Storage} label='MongoDB Atlas' />
                </CardContent>
              </Card>
            </Grid>

            {/* User Experience Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className='user-experience'>
                <CardHeader title='User Experience' />
                <CardContent
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <TechIcon icon={DarkMode} label='Dark Mode' />
                  <TechIcon icon={Language} label='Multi-language' />
                </CardContent>
              </Card>
            </Grid>

            {/* Mobile Compatibility Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className='mobile-compatibility'>
                <CardHeader title='Mobile Compatibility' />
                <CardContent
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <TechIcon icon={PhoneAndroid} label='Responsive Design' />
                </CardContent>
              </Card>
            </Grid>

            {/* Database & Migrations Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className='db-tech'>
                <CardHeader title='Databases & Migrations' />
                <CardContent
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <TechIcon icon={Storage} label='PostgreSQL' />
                  <TechIcon icon={Storage} label='MongoDB' />
                  <TechIcon icon={Code} label='db-migrate' />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebAppTour;

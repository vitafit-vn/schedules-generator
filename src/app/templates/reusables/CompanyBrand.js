import { HOME_PAGE } from 'app/constants';

const CompanyBrand = () => (
  <div className="text-center text-wrap">
    <a href={HOME_PAGE} rel="noopener noreferrer" target="_blank">
      <img height="100" src={`${process.env.PUBLIC_PATH}/images/logo.png`} />
    </a>
    <div className="mt-3">
      <h5 className="font-weight-bold">{'Công ty Cổ phần VitaFit Việt Nam'}</h5>
      <div>{'Tầng 6, nhà C, số 22 Thành Công'}</div>
      <div>{'P. Thành Công, Q. Ba Đình, Hà Nội'}</div>
      <a href={HOME_PAGE} rel="noopener noreferrer" target="_blank">
        {'www.vitafit.vn'}
      </a>
    </div>
  </div>
);

export default CompanyBrand;
